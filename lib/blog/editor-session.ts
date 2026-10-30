import {
  createHmac,
  timingSafeEqual,
} from "node:crypto";

export const BLOG_EDITOR_COOKIE = "blog_editor_session";
export const BLOG_EDITOR_SESSION_SECONDS = 60 * 60 * 24 * 7;

function getBlogEditorPassword(): string | null {
  return process.env.BLOG_EDITOR_PASSWORD || null;
}

function getSessionSecret(): string | null {
  return process.env.BLOG_EDITOR_SESSION_SECRET || null;
}

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

export function matchesBlogEditorPassword(provided: string): boolean {
  const expected = getBlogEditorPassword();
  return expected ? safeEqual(provided, expected) : false;
}

function signExpiry(expiry: string, secret: string): string {
  return createHmac("sha256", secret)
    .update(expiry)
    .digest("hex");
}

export function createBlogEditorSession(): string | null {
  const secret = getSessionSecret();

  if (!secret) {
    return null;
  }

  const expiry = String(
    Math.floor(Date.now() / 1000) + BLOG_EDITOR_SESSION_SECONDS,
  );

  return `${expiry}.${signExpiry(expiry, secret)}`;
}

function readCookie(request: Request, name: string): string | null {
  const cookies = request.headers.get("cookie");

  if (!cookies) {
    return null;
  }

  const entry = cookies
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));

  return entry ? entry.slice(name.length + 1) : null;
}

export function hasValidBlogEditorSession(request: Request): boolean {
  const secret = getSessionSecret();
  const value = readCookie(request, BLOG_EDITOR_COOKIE);

  if (!secret || !value) {
    return false;
  }

  const [expiry, signature, ...extra] = value.split(".");
  const expiryNumber = Number(expiry);

  if (
    !expiry ||
    !signature ||
    extra.length > 0 ||
    !Number.isSafeInteger(expiryNumber) ||
    expiryNumber <= Math.floor(Date.now() / 1000)
  ) {
    return false;
  }

  return safeEqual(signature, signExpiry(expiry, secret));
}

export function isSameOriginRequest(request: Request): boolean {
  const origin = request.headers.get("origin");

  return Boolean(origin && origin === new URL(request.url).origin);
}
