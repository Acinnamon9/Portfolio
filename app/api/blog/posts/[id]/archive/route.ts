import { NextResponse } from "next/server";

import {
  archiveBlogPost,
} from "../../../../../../lib/blog/repository";

import {
  handleBlogApiError,
  requireBlogApiAuth,
} from "../../../../../../lib/blog/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(
  request: Request,
  context: RouteContext,
) {
  const authError =
    requireBlogApiAuth(request);

  if (authError) {
    return authError;
  }

  try {
    const { id } = await context.params;

    const post =
      await archiveBlogPost(id);

    return NextResponse.json({
      post,
      message:
        "Blog post archived successfully.",
    });
  } catch (error) {
    return handleBlogApiError(error);
  }
}
