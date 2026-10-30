import { NextResponse } from "next/server";
import {
  BLOG_EDITOR_COOKIE,
  BLOG_EDITOR_SESSION_SECONDS,
  createBlogEditorSession,
  hasValidBlogEditorSession,
  isSameOriginRequest,
  matchesBlogEditorPassword,
} from "../../../../lib/blog/editor-session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!hasValidBlogEditorSession(request)) {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 },
    );
  }

  return NextResponse.json({ authenticated: true });
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json(
      { error: "Sign-in requests must come from this website." },
      { status: 403 },
    );
  }

  if (
    !process.env.BLOG_EDITOR_PASSWORD ||
    !process.env.BLOG_EDITOR_SESSION_SECRET
  ) {
    return NextResponse.json(
      { error: "The blog editor is not configured." },
      { status: 500 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Enter the editor password to sign in." },
      { status: 400 },
    );
  }

  const password =
    typeof body === "object" && body !== null && "password" in body
      ? body.password
      : null;

  if (
    typeof password !== "string" ||
    !matchesBlogEditorPassword(password)
  ) {
    return NextResponse.json(
      { error: "That editor password is not valid." },
      { status: 401 },
    );
  }

  const value = createBlogEditorSession();

  if (!value) {
    return NextResponse.json(
      { error: "The blog editor is not configured." },
      { status: 500 },
    );
  }

  const response = NextResponse.json({ authenticated: true });
  response.cookies.set({
    name: BLOG_EDITOR_COOKIE,
    value,
    httpOnly: true,
    secure:
      process.env.NODE_ENV === "production" ||
      new URL(request.url).protocol === "https:",
    sameSite: "strict",
    path: "/api/blog",
    maxAge: BLOG_EDITOR_SESSION_SECONDS,
  });

  return response;
}

export async function DELETE(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json(
      { error: "Sign-out requests must come from this website." },
      { status: 403 },
    );
  }

  const response = NextResponse.json({ authenticated: false });
  response.cookies.set({
    name: BLOG_EDITOR_COOKIE,
    value: "",
    httpOnly: true,
    secure:
      process.env.NODE_ENV === "production" ||
      new URL(request.url).protocol === "https:",
    sameSite: "strict",
    path: "/api/blog",
    maxAge: 0,
  });

  return response;
}
