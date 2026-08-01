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
    throw new Error(
      `Assertion failed: ${message}`,
    );
  }
}

type ApiPost = {
  id: string;
  slug: string;
  title: string;
  description: string;
  contentMarkdown: string;
  status:
    | "draft"
    | "published"
    | "archived";
  publishedAt: string | null;
};

type ApiRevision = {
  id: string;
  postId: string;
  revisionNumber: number;
  title: string;
  changeSummary: string;
};

const baseUrl =
  process.env.BLOG_API_BASE_URL ??
  "http://localhost:3000";

const apiKey =
  process.env.BLOG_API_KEY;

if (!apiKey) {
  throw new Error(
    "BLOG_API_KEY is not configured.",
  );
}

async function apiRequest<T>(
  pathname: string,
  options: RequestInit = {},
): Promise<{
  status: number;
  body: T;
}> {
  const response = await fetch(
    `${baseUrl}${pathname}`,
    {
      ...options,
      headers: {
        Authorization:
          `Bearer ${apiKey}`,
        ...(options.body
          ? {
              "Content-Type":
                "application/json",
            }
          : {}),
        ...options.headers,
      },
    },
  );

  const contentType =
    response.headers.get("content-type") ?? "";

  const responseText =
    await response.text();

  if (
    !contentType.includes("application/json")
  ) {
    throw new Error(
      [
        `Expected JSON from ${options.method ?? "GET"} ${pathname}.`,
        `Status: ${response.status} ${response.statusText}`,
        `Content-Type: ${contentType || "unknown"}`,
        "Response preview:",
        responseText.slice(0, 1000),
      ].join("\n"),
    );
  }

  let body: T;

  try {
    body = JSON.parse(responseText) as T;
  } catch {
    throw new Error(
      [
        `Invalid JSON from ${options.method ?? "GET"} ${pathname}.`,
        `Status: ${response.status} ${response.statusText}`,
        "Response preview:",
        responseText.slice(0, 1000),
      ].join("\n"),
    );
  }

  return {
    status: response.status,
    body,
  };
}

function logStep(
  step: number,
  message: string,
): void {
  console.log(`\n[${step}] ${message}`);
}

async function main(): Promise<void> {
  const {
    deleteBlogPost,
  } = await import(
    "../lib/blog/repository"
  );

  const suffix =
    `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`;

  const initialSlug =
    `api-smoke-test-${suffix}`;

  const updatedSlug =
    `api-smoke-test-updated-${suffix}`;

  let postId: string | null = null;

  try {
    logStep(
      1,
      "Rejecting unauthenticated request",
    );

    const unauthorized =
      await fetch(
        `${baseUrl}/api/blog/posts`,
      );

    assert(
      unauthorized.status === 401,
      "Missing authentication should return 401.",
    );

    console.log(
      "Unauthenticated request rejected.",
    );

    logStep(
      2,
      "Creating draft through API",
    );

    const createdResponse =
      await apiRequest<{
        post: ApiPost;
      }>("/api/blog/posts", {
        method: "POST",
        body: JSON.stringify({
          title:
            "Blog API Smoke Test Article",
          slug: initialSlug,
          description:
            "A temporary article used to validate the authenticated blog API lifecycle.",
          contentMarkdown: `
# Blog API Smoke Test

This article exists temporarily to verify that authenticated HTTP routes can
create, retrieve, revise, publish, unpublish, archive, and inspect revisions.

It will be removed automatically after the API smoke test completes.
          `.trim(),
        }),
      });

    assert(
      createdResponse.status === 201,
      "Create route should return 201.",
    );

    const created =
      createdResponse.body.post;

    postId = created.id;

    assert(
      created.status === "draft",
      "Created article must be a draft.",
    );

    console.log({
      id: created.id,
      slug: created.slug,
      status: created.status,
    });

    logStep(
      3,
      "Retrieving article through API",
    );

    const getResponse =
      await apiRequest<{
        post: ApiPost;
      }>(
        `/api/blog/posts/${created.id}`,
      );

    assert(
      getResponse.status === 200,
      "Get route should return 200.",
    );

    assert(
      getResponse.body.post.id ===
        created.id,
      "Retrieved post ID must match.",
    );

    console.log("Retrieval passed.");

    logStep(
      4,
      "Listing drafts through API",
    );

    const draftListResponse =
      await apiRequest<{
        posts: ApiPost[];
        count: number;
      }>(
        "/api/blog/posts?status=draft",
      );

    assert(
      draftListResponse.status === 200,
      "Draft listing should return 200.",
    );

    assert(
      draftListResponse.body.posts.some(
        (post) =>
          post.id === created.id,
      ),
      "Created post should appear in draft listing.",
    );

    console.log({
      count:
        draftListResponse.body.count,
    });

    logStep(
      5,
      "Updating draft through API",
    );

    const updateResponse =
      await apiRequest<{
        post: ApiPost;
      }>(
        `/api/blog/posts/${created.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            title:
              "Updated Blog API Smoke Test",
            slug: updatedSlug,
            description:
              "An updated temporary article proving that API edits preserve revision history.",
            contentMarkdown: `
# Updated Blog API Smoke Test

The article has now been updated through the authenticated PATCH endpoint.

The previous version should exist as an immutable revision while this content
remains the current version stored in the blog_posts table.
            `.trim(),
            changeSummary:
              "Updated the API smoke-test article.",
          }),
        },
      );

    assert(
      updateResponse.status === 200,
      "Update route should return 200.",
    );

    assert(
      updateResponse.body.post.slug ===
        updatedSlug,
      "Slug should be updated.",
    );

    console.log({
      slug:
        updateResponse.body.post.slug,
      status:
        updateResponse.body.post.status,
    });

    logStep(
      6,
      "Retrieving revision history",
    );

    const revisionsResponse =
      await apiRequest<{
        revisions: ApiRevision[];
        count: number;
      }>(
        `/api/blog/posts/${created.id}/revisions`,
      );

    assert(
      revisionsResponse.status === 200,
      "Revision route should return 200.",
    );

    assert(
      revisionsResponse.body.count === 1,
      "One revision should exist.",
    );

    assert(
      revisionsResponse.body
        .revisions[0]
        .revisionNumber === 1,
      "First revision number should be 1.",
    );

    console.log({
      count:
        revisionsResponse.body.count,
      revisionNumber:
        revisionsResponse.body
          .revisions[0]
          .revisionNumber,
    });

    logStep(
      7,
      "Publishing through API",
    );

    const publishResponse =
      await apiRequest<{
        post: ApiPost;
      }>(
        `/api/blog/posts/${created.id}/publish`,
        {
          method: "POST",
          body: JSON.stringify({
            confirmation: "PUBLISH",
          }),
        },
      );

    assert(
      publishResponse.status === 200,
      "Publish route should return 200.",
    );

    assert(
      publishResponse.body.post.status ===
        "published",
      "Post should be published.",
    );

    console.log({
      status:
        publishResponse.body.post.status,
      publishedAt:
        publishResponse.body.post
          .publishedAt,
    });

    logStep(
      8,
      "Listing published posts",
    );

    const publishedListResponse =
      await apiRequest<{
        posts: ApiPost[];
        count: number;
      }>(
        "/api/blog/posts?status=published",
      );

    assert(
      publishedListResponse.status === 200,
      "Published listing should return 200.",
    );

    assert(
      publishedListResponse.body
        .posts.some(
          (post) =>
            post.id === created.id,
        ),
      "Published article should appear in published listing.",
    );

    console.log({
      count:
        publishedListResponse.body.count,
    });

    logStep(
      9,
      "Blocking edits to published article",
    );

    const invalidUpdate =
      await apiRequest<{
        error: {
          code: string;
        };
      }>(
        `/api/blog/posts/${created.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            title:
              "Forbidden Published Edit",
            changeSummary:
              "This edit must fail.",
          }),
        },
      );

    assert(
      invalidUpdate.status === 409,
      "Published edit should return 409.",
    );

    assert(
      invalidUpdate.body.error.code ===
        "BLOG_POST_NOT_DRAFT",
      "Published edit should return the correct error code.",
    );

    console.log(
      "Published edit correctly blocked.",
    );

    logStep(
      10,
      "Moving article back to draft",
    );

    const draftResponse =
      await apiRequest<{
        post: ApiPost;
      }>(
        `/api/blog/posts/${created.id}/draft`,
        {
          method: "POST",
        },
      );

    assert(
      draftResponse.status === 200,
      "Draft transition should return 200.",
    );

    assert(
      draftResponse.body.post.status ===
        "draft",
      "Post should return to draft.",
    );

    console.log({
      status:
        draftResponse.body.post.status,
    });

    logStep(
      11,
      "Archiving article through API",
    );

    const archiveResponse =
      await apiRequest<{
        post: ApiPost;
      }>(
        `/api/blog/posts/${created.id}/archive`,
        {
          method: "POST",
        },
      );

    assert(
      archiveResponse.status === 200,
      "Archive route should return 200.",
    );

    assert(
      archiveResponse.body.post.status ===
        "archived",
      "Post should become archived.",
    );

    console.log({
      status:
        archiveResponse.body.post.status,
    });

    logStep(
      12,
      "Authenticated API lifecycle completed",
    );

    console.log({
      authentication: true,
      create: true,
      retrieve: true,
      listDrafts: true,
      update: true,
      revisions: true,
      publish: true,
      listPublished: true,
      publishedEditProtection: true,
      unpublish: true,
      archive: true,
    });
  } finally {
    if (postId) {
      logStep(
        13,
        "Deleting temporary API test data",
      );

      await deleteBlogPost(postId);

      console.log(
        "Temporary API post deleted.",
      );
    }
  }
}

main().catch((error: unknown) => {
  console.error(
    "\nBlog API smoke test failed:",
  );

  console.error(error);

  process.exitCode = 1;
});
