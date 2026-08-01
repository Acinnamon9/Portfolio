import { NextResponse } from "next/server";

import {
  listBlogPostRevisions,
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

    const revisions =
      await listBlogPostRevisions(id);

    return NextResponse.json({
      revisions,
      count: revisions.length,
    });
  } catch (error) {
    return handleBlogApiError(error);
  }
}
