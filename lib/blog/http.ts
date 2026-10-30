import {
  timingSafeEqual,
} from "node:crypto";

import { NextResponse } from "next/server";
import { ZodError } from "zod";
import {
  hasValidBlogEditorSession,
  isSameOriginRequest,
} from "./editor-session";

import {
  BlogPostAlreadyPublishedError,
  BlogPostArchivedError,
  BlogPostNotDraftError,
  BlogPostNotFoundError,
  BlogRevisionConflictError,
  BlogSlugConflictError,
} from "./errors";

type ErrorBody = {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

function jsonError(
  status: number,
  code: string,
  message: string,
  details?: unknown,
): NextResponse<ErrorBody> {
  return NextResponse.json(
    {
      error: {
        code,
        message,
        ...(details === undefined
          ? {}
          : { details }),
      },
    },
    {
      status,
    },
  );
}

/**
 * Compares secrets without an early-exit string comparison.
 *
 * Both values must have equal byte lengths before timingSafeEqual
 * can be used.
 */
function secretsMatch(
  provided: string,
  expected: string,
): boolean {
  const providedBuffer =
    Buffer.from(provided);

  const expectedBuffer =
    Buffer.from(expected);

  if (
    providedBuffer.length !==
    expectedBuffer.length
  ) {
    return false;
  }

  return timingSafeEqual(
    providedBuffer,
    expectedBuffer,
  );
}

/**
 * Validates either a private Bearer token or the same-origin website
 * editor session. Cookie-authenticated writes are restricted to this
 * site's origin.
 *
 * Returns a 401/500 response on failure and null on success.
 */
export function requireBlogApiAuth(
  request: Request,
): NextResponse<ErrorBody> | null {
  const authorization = request.headers.get("authorization");

  if (authorization) {
    const expectedKey = process.env.BLOG_API_KEY;

    if (!expectedKey) {
      console.error("BLOG_API_KEY is not configured.");

      return jsonError(
        500,
        "BLOG_API_NOT_CONFIGURED",
        "The blog API is not configured.",
      );
    }

    const [scheme, token, ...extra] = authorization.trim().split(/\s+/);

    if (
      scheme?.toLowerCase() !== "bearer" ||
      !token ||
      extra.length > 0
    ) {
      return jsonError(
        401,
        "INVALID_AUTHORIZATION_HEADER",
        "Authorization must use the Bearer scheme.",
      );
    }

    if (!secretsMatch(token, expectedKey)) {
      return jsonError(
        401,
        "INVALID_API_KEY",
        "The supplied API key is invalid.",
      );
    }

    return null;
  }

  if (hasValidBlogEditorSession(request)) {
    if (
      !["GET", "HEAD", "OPTIONS"].includes(request.method.toUpperCase()) &&
      !isSameOriginRequest(request)
    ) {
      return jsonError(
        403,
        "CROSS_ORIGIN_REQUEST",
        "The blog editor accepts changes from this website only.",
      );
    }

    return null;
  }

  return jsonError(
    401,
    "UNAUTHENTICATED",
    "A valid blog editor session or Bearer token is required.",
  );
}

/**
 * Converts repository and validation errors into stable HTTP
 * responses.
 */
export function handleBlogApiError(
  error: unknown,
): NextResponse<ErrorBody> {
  if (error instanceof ZodError) {
    return jsonError(
      400,
      "VALIDATION_ERROR",
      "The request data is invalid.",
      error.flatten(),
    );
  }

  if (
    error instanceof BlogPostNotFoundError
  ) {
    return jsonError(
      404,
      "BLOG_POST_NOT_FOUND",
      error.message,
    );
  }

  if (
    error instanceof BlogSlugConflictError
  ) {
    return jsonError(
      409,
      "BLOG_SLUG_CONFLICT",
      error.message,
    );
  }

  if (
    error instanceof BlogPostNotDraftError
  ) {
    return jsonError(
      409,
      "BLOG_POST_NOT_DRAFT",
      error.message,
    );
  }

  if (
    error instanceof
    BlogPostAlreadyPublishedError
  ) {
    return jsonError(
      409,
      "BLOG_POST_ALREADY_PUBLISHED",
      error.message,
    );
  }

  if (
    error instanceof BlogPostArchivedError
  ) {
    return jsonError(
      409,
      "BLOG_POST_ARCHIVED",
      error.message,
    );
  }

  if (
    error instanceof BlogRevisionConflictError
  ) {
    return jsonError(
      409,
      "BLOG_REVISION_CONFLICT",
      error.message,
    );
  }

  console.error(
    "Unexpected blog API error:",
    error,
  );

  return jsonError(
    500,
    "INTERNAL_SERVER_ERROR",
    "An unexpected error occurred.",
  );
}

/**
 * Reads a JSON request body and gives malformed JSON a stable error
 * shape.
 */
export async function readJsonBody(
  request: Request,
): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    throw new ZodError([
      {
        code: "custom",
        path: [],
        message:
          "Request body must contain valid JSON.",
      },
    ]);
  }
}
