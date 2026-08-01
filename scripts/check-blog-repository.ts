import { config } from "dotenv";

config({
  path: ".env.local",
  override: false,
});


function assert(
  condition: unknown,
  message: string,
): asserts condition {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

function logStep(
  step: number,
  message: string,
): void {
  console.log(`\n[${step}] ${message}`);
}

async function main(): Promise<void> {
  const {
    archiveBlogPost,
    createBlogDraft,
    deleteBlogPost,
    getBlogPostById,
    getBlogPostBySlug,
    getPublishedBlogPostBySlug,
    listBlogDrafts,
    listBlogPostRevisions,
    listPublishedBlogPosts,
    moveBlogPostToDraft,
    publishBlogPost,
    updateBlogDraft,
  } = await import("../lib/blog/repository");

  const {
    BlogPostNotDraftError,
    BlogPostNotFoundError,
  } = await import("../lib/blog/errors");

  const uniqueSuffix =
    `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`;

  const initialSlug =
    `repository-smoke-test-${uniqueSuffix}`;

  const updatedSlug =
    `repository-smoke-test-updated-${uniqueSuffix}`;

  let createdPostId: string | null = null;

  try {
    logStep(1, "Creating draft");

    const created = await createBlogDraft({
      title: "Repository Smoke Test Article",
      slug: initialSlug,
      description:
        "A temporary article used to verify the complete blog repository lifecycle.",
      contentMarkdown: `
# Repository Smoke Test

This temporary article verifies that the portfolio blog repository can create,
retrieve, revise, publish, unpublish, archive, and delete database-backed
content without exposing implementation details to future API route handlers.

The record will be deleted automatically when the smoke test completes.
      `.trim(),
    });

    createdPostId = created.id;

    assert(
      created.status === "draft",
      "New posts must begin in draft status.",
    );

    assert(
      created.slug === initialSlug,
      "Created slug should match the requested slug.",
    );

    console.log({
      id: created.id,
      slug: created.slug,
      status: created.status,
    });

    logStep(2, "Retrieving by ID and slug");

    const byId = await getBlogPostById(created.id);
    const bySlug = await getBlogPostBySlug(initialSlug);

    assert(
      byId.id === created.id,
      "ID retrieval should return the created post.",
    );

    assert(
      bySlug.id === created.id,
      "Slug retrieval should return the created post.",
    );

    console.log("Retrieval passed.");

    logStep(3, "Confirming draft appears in draft list");

    const draftsBeforeUpdate =
      await listBlogDrafts();

    assert(
      draftsBeforeUpdate.some(
        (post) => post.id === created.id,
      ),
      "Created post should appear in the draft list.",
    );

    console.log(
      `Draft count: ${draftsBeforeUpdate.length}`,
    );

    logStep(
      4,
      "Updating draft and preserving revision",
    );

    const updated = await updateBlogDraft(
      created.id,
      {
        title:
          "Updated Repository Smoke Test Article",
        slug: updatedSlug,
        description:
          "An updated temporary article proving that edits preserve immutable historical versions.",
        contentMarkdown: `
# Updated Repository Smoke Test

This is the second current version of the temporary article.

The repository should have stored the previous title, description, and Markdown
body inside blog_post_revisions before committing this updated state to
blog_posts.

This proves that conversational editing by the future Custom GPT will not
silently destroy the previous article version.
        `.trim(),
        changeSummary:
          "Updated title, slug, description, and article content during the repository smoke test.",
      },
    );

    assert(
      updated.title ===
        "Updated Repository Smoke Test Article",
      "The title should be updated.",
    );

    assert(
      updated.slug === updatedSlug,
      "The slug should be updated.",
    );

    assert(
      updated.status === "draft",
      "Updating should not publish the post.",
    );

    console.log({
      id: updated.id,
      slug: updated.slug,
      status: updated.status,
    });

    logStep(5, "Inspecting revision history");

    const revisions =
      await listBlogPostRevisions(created.id);

    assert(
      revisions.length === 1,
      "Exactly one revision should exist after one update.",
    );

    const firstRevision = revisions[0];

    assert(
      firstRevision.revisionNumber === 1,
      "The first saved revision number should be 1.",
    );

    assert(
      firstRevision.title ===
        "Repository Smoke Test Article",
      "The revision should preserve the old title.",
    );

    assert(
      firstRevision.description.includes(
        "temporary article",
      ),
      "The revision should preserve the old description.",
    );

    assert(
      firstRevision.contentMarkdown.includes(
        "# Repository Smoke Test",
      ),
      "The revision should preserve the old Markdown.",
    );

    console.log({
      revisionNumber:
        firstRevision.revisionNumber,
      title: firstRevision.title,
      changeSummary:
        firstRevision.changeSummary,
    });

    logStep(
      6,
      "Confirming the old slug no longer resolves",
    );

    try {
      await getBlogPostBySlug(initialSlug);

      throw new Error(
        "The previous slug unexpectedly resolved.",
      );
    } catch (error) {
      assert(
        error instanceof BlogPostNotFoundError,
        "The old slug should produce BlogPostNotFoundError.",
      );
    }

    const updatedBySlug =
      await getBlogPostBySlug(updatedSlug);

    assert(
      updatedBySlug.id === created.id,
      "The updated slug should resolve to the post.",
    );

    console.log("Slug replacement passed.");

    logStep(7, "Publishing article");

    const published = await publishBlogPost(
      created.id,
    );

    assert(
      published.status === "published",
      "The post should be published.",
    );

    assert(
      published.publishedAt instanceof Date,
      "Publishing should assign publishedAt.",
    );

    console.log({
      status: published.status,
      publishedAt: published.publishedAt,
    });

    logStep(
      8,
      "Confirming public retrieval and listing",
    );

    const publicPost =
      await getPublishedBlogPostBySlug(
        updatedSlug,
      );

    assert(
      publicPost.id === created.id,
      "The published slug should resolve publicly.",
    );

    const publishedPosts =
      await listPublishedBlogPosts();

    assert(
      publishedPosts.some(
        (post) => post.id === created.id,
      ),
      "Published post should appear in the public list.",
    );

    console.log(
      `Published count: ${publishedPosts.length}`,
    );

    logStep(
      9,
      "Confirming published content cannot be edited as a draft",
    );

    try {
      await updateBlogDraft(created.id, {
        title:
          "This update must not be accepted",
        changeSummary:
          "Attempted invalid edit after publication.",
      });

      throw new Error(
        "Published post was unexpectedly editable.",
      );
    } catch (error) {
      assert(
        error instanceof BlogPostNotDraftError,
        "Published update should throw BlogPostNotDraftError.",
      );
    }

    console.log(
      "Published-edit protection passed.",
    );

    logStep(10, "Moving article back to draft");

    const returnedDraft =
      await moveBlogPostToDraft(created.id);

    assert(
      returnedDraft.status === "draft",
      "The post should return to draft status.",
    );

    assert(
      returnedDraft.publishedAt === null,
      "Unpublishing should clear publishedAt.",
    );

    try {
      await getPublishedBlogPostBySlug(
        updatedSlug,
      );

      throw new Error(
        "Draft unexpectedly remained publicly retrievable.",
      );
    } catch (error) {
      assert(
        error instanceof BlogPostNotFoundError,
        "Unpublished content should not resolve publicly.",
      );
    }

    console.log("Unpublish behaviour passed.");

    logStep(11, "Archiving article");

    const archived =
      await archiveBlogPost(created.id);

    assert(
      archived.status === "archived",
      "The post should become archived.",
    );

    try {
      await getPublishedBlogPostBySlug(
        updatedSlug,
      );

      throw new Error(
        "Archived article unexpectedly resolved publicly.",
      );
    } catch (error) {
      assert(
        error instanceof BlogPostNotFoundError,
        "Archived content should not resolve publicly.",
      );
    }

    console.log("Archive behaviour passed.");

    logStep(
      12,
      "Repository lifecycle completed successfully",
    );

    console.log({
      created: true,
      retrieved: true,
      updated: true,
      revisionPreserved: true,
      published: true,
      publicQueryVerified: true,
      unpublished: true,
      archived: true,
    });
  } finally {
    if (createdPostId) {
      logStep(
        13,
        "Deleting temporary smoke-test record",
      );

      await deleteBlogPost(createdPostId);

      try {
        await getBlogPostById(createdPostId);

        throw new Error(
          "Deleted post unexpectedly still exists.",
        );
      } catch (error) {
        assert(
          error instanceof BlogPostNotFoundError,
          "Deleted post should no longer exist.",
        );
      }

      console.log(
        "Temporary post and cascading revisions deleted.",
      );
    }
  }
}

main().catch((error: unknown) => {
  console.error(
    "\nBlog repository smoke test failed:",
  );

  console.error(error);

  process.exitCode = 1;
});
