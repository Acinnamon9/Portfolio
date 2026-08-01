import { NextResponse } from "next/server";

import {
  getBlogPostById,
  updateBlogDraft,
} from "../../../../../lib/blog/repository";

import {
  handleBlogApiError,
  readJsonBody,
  requireBlogApiAuth,
} from "../../../../../lib/blog/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
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
      await getBlogPostById(id);

    return NextResponse.json({
      post,
    });
  } catch (error) {
    return handleBlogApiError(error);
  }
}

export async function PATCH(
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

    const body =
      await readJsonBody(request);

    const post =
      await updateBlogDraft(
        id,
        body as Parameters<
          typeof updateBlogDraft
        >[1],
      );

    return NextResponse.json({
      post,
    });
  } catch (error) {
    return handleBlogApiError(error);
  }
}
