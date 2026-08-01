import { NextResponse } from "next/server";

import {
  publishBlogPostActionSchema,
} from "../../../../../../lib/blog/action-schemas";

import {
  publishBlogPost,
} from "../../../../../../lib/blog/repository";

import {
  handleBlogApiError,
  readJsonBody,
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
    const { id } =
      await context.params;

    const body =
      await readJsonBody(request);

    publishBlogPostActionSchema.parse(
      body,
    );

    const post =
      await publishBlogPost(id);

    return NextResponse.json({
      post,
      message:
        "Blog post published successfully.",
    });
  } catch (error) {
    return handleBlogApiError(error);
  }
}
