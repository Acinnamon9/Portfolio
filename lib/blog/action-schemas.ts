import { z } from "zod";

/**
 * Publishing is intentionally stricter than ordinary draft editing.
 *
 * The Custom GPT must send this exact value after:
 *
 * 1. showing the user the current article;
 * 2. receiving explicit publication approval;
 * 3. receiving ChatGPT's consequential-action confirmation.
 */
export const publishBlogPostActionSchema =
  z.object({
    confirmation: z.literal("PUBLISH"),
  });

export type PublishBlogPostActionInput =
  z.infer<
    typeof publishBlogPostActionSchema
  >;
