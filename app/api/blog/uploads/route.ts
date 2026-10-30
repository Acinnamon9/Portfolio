import { handleUploadPresigned } from "@vercel/blob/client";
import { issueSignedToken } from "@vercel/blob";
import { generateKeyPairSync } from "node:crypto";
import { NextResponse } from "next/server";
import { requireBlogApiAuth } from "../../../../lib/blog/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];
// Upload completion callbacks are not enabled for this route. The SDK currently
// requires a webhook verification key even when no callback is configured.
const uploadWebhookPublicKey = generateKeyPairSync("ed25519").publicKey
  .export({ type: "spki", format: "pem" })
  .toString();

export async function POST(request: Request) {
  const authError = requireBlogApiAuth(request);

  if (authError) {
    return authError;
  }

  if (!process.env.VERCEL_OIDC_TOKEN && !process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Image uploads are not configured on this site yet." },
      { status: 503 },
    );
  }

  try {
    const result = await handleUploadPresigned({
      body: await request.json(),
      request,
      webhookPublicKey: uploadWebhookPublicKey,
      getSignedToken: async (pathname) => {
        if (!/^blog-images\/[0-9a-f-]{36}\.(jpg|png|webp|gif)$/i.test(pathname)) {
          throw new Error("Uploads must use the blog image folder.");
        }

        const token = await issueSignedToken({
          pathname,
          operations: ["put"],
          allowedContentTypes: ALLOWED_IMAGE_TYPES,
          maximumSizeInBytes: MAX_IMAGE_SIZE,
          validUntil: Date.now() + 15 * 60 * 1000,
        });

        return { token };
      },
    });

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "The image upload could not be authorized." },
      { status: 400 },
    );
  }
}
