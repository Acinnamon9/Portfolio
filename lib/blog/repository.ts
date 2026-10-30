import {
  desc,
  eq,
  max,
} from "drizzle-orm";

import { db } from "../db";

import {
  blogPostRevisions,
  blogPosts,
  type BlogPost,
  type BlogPostRevision,
} from "../db/schema";

import {
  BlogPostAlreadyPublishedError,
  BlogPostArchivedError,
  BlogPostNotDraftError,
  BlogPostNotFoundError,
  BlogRevisionConflictError,
  BlogSlugConflictError,
} from "./errors";

import {
  createBlogDraftSchema,
  updateBlogDraftSchema,
  type CreateBlogDraftInput,
  type UpdateBlogDraftInput,
} from "./schemas";

type DatabaseError = {
  code?: string;
  constraint?: string;
};

function getDatabaseError(error: unknown): DatabaseError | null {
  if (typeof error !== "object" || error === null) {
    return null;
  }

  return error as DatabaseError;
}

function isUniqueViolation(error: unknown): boolean {
  return getDatabaseError(error)?.code === "23505";
}

function isSlugUniqueViolation(error: unknown): boolean {
  const databaseError = getDatabaseError(error);

  return (
    databaseError?.code === "23505" &&
    databaseError.constraint === "blog_posts_slug_unique"
  );
}

function isRevisionUniqueViolation(error: unknown): boolean {
  const databaseError = getDatabaseError(error);

  return (
    databaseError?.code === "23505" &&
    databaseError.constraint ===
      "blog_post_revisions_post_revision_unique"
  );
}

/**
 * Creates a new article in draft state.
 *
 * The caller cannot use this operation to publish directly.
 */
export async function createBlogDraft(
  input: CreateBlogDraftInput,
): Promise<BlogPost> {
  const validated = createBlogDraftSchema.parse(input);

  try {
    const [createdPost] = await db
      .insert(blogPosts)
      .values({
        title: validated.title,
        slug: validated.slug,
        description: validated.description,
        coverImageUrl: validated.coverImageUrl,
        contentMarkdown: validated.contentMarkdown,
        status: "draft",
      })
      .returning();

    if (!createdPost) {
      throw new Error(
        "The database did not return the created blog post.",
      );
    }

    return createdPost;
  } catch (error) {
    if (
      isSlugUniqueViolation(error) ||
      (
        isUniqueViolation(error) &&
        getDatabaseError(error)?.constraint === undefined
      )
    ) {
      throw new BlogSlugConflictError(validated.slug);
    }

    throw error;
  }
}

/**
 * Retrieves one post regardless of publication state.
 *
 * This is an internal/editorial operation. Public routes should use
 * getPublishedBlogPostBySlug instead.
 */
export async function getBlogPostById(
  id: string,
): Promise<BlogPost> {
  const [post] = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.id, id))
    .limit(1);

  if (!post) {
    throw new BlogPostNotFoundError(id);
  }

  return post;
}

/**
 * Retrieves one post by slug regardless of publication state.
 *
 * This is suitable for authenticated editorial operations.
 */
export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost> {
  const [post] = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .limit(1);

  if (!post) {
    throw new BlogPostNotFoundError(slug);
  }

  return post;
}

/**
 * Lists drafts with the most recently updated post first.
 */
export async function listBlogDrafts(): Promise<BlogPost[]> {
  return db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.status, "draft"))
    .orderBy(desc(blogPosts.updatedAt));
}

/**
 * Lists published articles newest first.
 *
 * This operation is suitable for the future public /blog page.
 */
export async function listPublishedBlogPosts(): Promise<
  BlogPost[]
> {
  return db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"))
    .orderBy(
      desc(blogPosts.publishedAt),
      desc(blogPosts.updatedAt),
    );
}

/**
 * Lists the three newest published articles for the homepage.
 */
export async function listLatestPublishedBlogPosts(): Promise<
  BlogPost[]
> {
  return db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"))
    .orderBy(
      desc(blogPosts.publishedAt),
      desc(blogPosts.updatedAt),
    )
    .limit(3);
}

/**
 * Retrieves a public article by slug.
 *
 * Draft and archived posts deliberately behave as "not found" so
 * public callers cannot use this function to expose private content.
 */
export async function getPublishedBlogPostBySlug(
  slug: string,
): Promise<BlogPost> {
  const [post] = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .limit(1);

  if (!post || post.status !== "published") {
    throw new BlogPostNotFoundError(slug);
  }

  return post;
}

/**
 * Returns immutable historical versions, newest first.
 */
export async function listBlogPostRevisions(
  postId: string,
): Promise<BlogPostRevision[]> {
  await getBlogPostById(postId);

  return db
    .select()
    .from(blogPostRevisions)
    .where(eq(blogPostRevisions.postId, postId))
    .orderBy(desc(blogPostRevisions.revisionNumber));
}

/**
 * Updates a draft while saving the previous current state as an
 * immutable revision.
 *
 * Transaction:
 *
 * 1. Read current post.
 * 2. Confirm it is editable.
 * 3. Calculate the next revision number.
 * 4. Save the old title, description, and Markdown.
 * 5. Update the current blog_posts record.
 *
 * If any step fails, the transaction is rolled back.
 */
export async function updateBlogDraft(
  postId: string,
  input: UpdateBlogDraftInput,
): Promise<BlogPost> {
  const validated = updateBlogDraftSchema.parse(input);

  try {
    return await db.transaction(async (tx) => {
      const [existingPost] = await tx
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.id, postId))
        .limit(1);

      if (!existingPost) {
        throw new BlogPostNotFoundError(postId);
      }

      if (existingPost.status !== "draft") {
        throw new BlogPostNotDraftError(
          postId,
          existingPost.status,
        );
      }

      const [revisionAggregate] = await tx
        .select({
          highestRevisionNumber: max(
            blogPostRevisions.revisionNumber,
          ),
        })
        .from(blogPostRevisions)
        .where(eq(blogPostRevisions.postId, postId));

      const nextRevisionNumber =
        (
          revisionAggregate?.highestRevisionNumber ??
          0
        ) + 1;

      await tx
        .insert(blogPostRevisions)
        .values({
          postId: existingPost.id,
          revisionNumber: nextRevisionNumber,
          title: existingPost.title,
          description: existingPost.description,
          coverImageUrl: existingPost.coverImageUrl,
          contentMarkdown:
            existingPost.contentMarkdown,
          changeSummary: validated.changeSummary,
        });

      const [updatedPost] = await tx
        .update(blogPosts)
        .set({
          title:
            validated.title ??
            existingPost.title,

          slug:
            validated.slug ??
            existingPost.slug,

          description:
            validated.description ??
            existingPost.description,

          coverImageUrl:
            validated.coverImageUrl !== undefined
              ? validated.coverImageUrl
              : existingPost.coverImageUrl,

          contentMarkdown:
            validated.contentMarkdown ??
            existingPost.contentMarkdown,

          updatedAt: new Date(),
        })
        .where(eq(blogPosts.id, postId))
        .returning();

      if (!updatedPost) {
        throw new Error(
          "The database did not return the updated blog post.",
        );
      }

      return updatedPost;
    });
  } catch (error) {
    if (error instanceof BlogPostNotFoundError) {
      throw error;
    }

    if (error instanceof BlogPostNotDraftError) {
      throw error;
    }

    if (isSlugUniqueViolation(error)) {
      throw new BlogSlugConflictError(
        validated.slug ?? "unknown",
      );
    }

    if (isRevisionUniqueViolation(error)) {
      throw new BlogRevisionConflictError(postId);
    }

    throw error;
  }
}

/**
 * Publishes a draft.
 *
 * This function does not decide whether the user gave explicit
 * approval. The future API/GPT layer must only call this operation
 * after that approval has been established.
 */
export async function publishBlogPost(
  postId: string,
): Promise<BlogPost> {
  return db.transaction(async (tx) => {
    const [existingPost] = await tx
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.id, postId))
      .limit(1);

    if (!existingPost) {
      throw new BlogPostNotFoundError(postId);
    }

    if (existingPost.status === "published") {
      throw new BlogPostAlreadyPublishedError(postId);
    }

    if (existingPost.status === "archived") {
      throw new BlogPostArchivedError(postId);
    }

    const now = new Date();

    const [publishedPost] = await tx
      .update(blogPosts)
      .set({
        status: "published",
        publishedAt: now,
        scheduledFor: null,
        updatedAt: now,
      })
      .where(eq(blogPosts.id, postId))
      .returning();

    if (!publishedPost) {
      throw new Error(
        "The database did not return the published blog post.",
      );
    }

    return publishedPost;
  });
}

/**
 * Moves a draft or published article into archived state.
 *
 * We retain publishedAt as historical metadata. The public queries
 * filter on status, so archived content is no longer public.
 */
export async function archiveBlogPost(
  postId: string,
): Promise<BlogPost> {
  return db.transaction(async (tx) => {
    const [existingPost] = await tx
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.id, postId))
      .limit(1);

    if (!existingPost) {
      throw new BlogPostNotFoundError(postId);
    }

    const [archivedPost] = await tx
      .update(blogPosts)
      .set({
        status: "archived",
        scheduledFor: null,
        updatedAt: new Date(),
      })
      .where(eq(blogPosts.id, postId))
      .returning();

    if (!archivedPost) {
      throw new Error(
        "The database did not return the archived blog post.",
      );
    }

    return archivedPost;
  });
}

/**
 * Moves a published or archived post back into draft state.
 *
 * This enables explicit unpublishing. Revision history remains
 * untouched.
 */
export async function moveBlogPostToDraft(
  postId: string,
): Promise<BlogPost> {
  return db.transaction(async (tx) => {
    const [existingPost] = await tx
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.id, postId))
      .limit(1);

    if (!existingPost) {
      throw new BlogPostNotFoundError(postId);
    }

    const [draftPost] = await tx
      .update(blogPosts)
      .set({
        status: "draft",
        publishedAt: null,
        scheduledFor: null,
        updatedAt: new Date(),
      })
      .where(eq(blogPosts.id, postId))
      .returning();

    if (!draftPost) {
      throw new Error(
        "The database did not return the draft blog post.",
      );
    }

    return draftPost;
  });
}

/**
 * Deletes a post and its revisions.
 *
 * Revision deletion happens through the foreign key's ON DELETE
 * CASCADE behaviour.
 *
 * This should initially remain an internal/test operation rather
 * than being exposed directly to the Custom GPT.
 */
export async function deleteBlogPost(
  postId: string,
): Promise<void> {
  const deletedRows = await db
    .delete(blogPosts)
    .where(eq(blogPosts.id, postId))
    .returning({
      id: blogPosts.id,
    });

  if (deletedRows.length === 0) {
    throw new BlogPostNotFoundError(postId);
  }
}
