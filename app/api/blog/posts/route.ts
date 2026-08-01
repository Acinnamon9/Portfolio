import { NextResponse } from "next/server";

import {
  createBlogDraft,
  listBlogDrafts,
  listPublishedBlogPosts,
} from "../../../../lib/blog/repository";

import {
  handleBlogApiError,
  readJsonBody,
  requireBlogApiAuth,
} from "../../../../lib/blog/http";

export const runtime = "nodejs";

export async function POST(
  request: Request,
) {
  const authError =
    requireBlogApiAuth(request);

  if (authError) {
    return authError;
  }

  try {
    const body =
      await readJsonBody(request);

    const post =
      await createBlogDraft(
        body as Parameters<
          typeof createBlogDraft
        >[0],
      );

    return NextResponse.json(
      {
        post,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    return handleBlogApiError(error);
  }
}

export async function GET(
  request: Request,
) {
  const authError =
    requireBlogApiAuth(request);

  if (authError) {
    return authError;
  }

  try {
    const url = new URL(request.url);

    const status =
      url.searchParams.get("status") ??
      "draft";

    if (status === "draft") {
      const posts =
        await listBlogDrafts();

      return NextResponse.json({
        posts,
        count: posts.length,
        status,
      });
    }

    if (status === "published") {
      const posts =
        await listPublishedBlogPosts();

      return NextResponse.json({
        posts,
        count: posts.length,
        status,
      });
    }

    return NextResponse.json(
      {
        error: {
          code: "INVALID_STATUS_FILTER",
          message:
            'Status must be either "draft" or "published".',
        },
      },
      {
        status: 400,
      },
    );
  } catch (error) {
    return handleBlogApiError(error);
  }
}
