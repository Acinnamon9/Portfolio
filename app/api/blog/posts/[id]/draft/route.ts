import { NextResponse } from "next/server";

import {
  moveBlogPostToDraft,
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
      await moveBlogPostToDraft(id);

    return NextResponse.json({
      post,
      message:
        "Blog post moved to draft successfully.",
    });
  } catch (error) {
    return handleBlogApiError(error);
  }
}
