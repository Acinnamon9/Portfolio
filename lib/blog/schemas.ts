import { z } from "zod";

export const blogSlugSchema = z
  .string()
  .trim()
  .min(3, "Slug must contain at least 3 characters.")
  .max(120, "Slug must not exceed 120 characters.")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must use lowercase kebab-case.",
  );

const blogTitleSchema = z
  .string()
  .trim()
  .min(5, "Title must contain at least 5 characters.")
  .max(160, "Title must not exceed 160 characters.");

const blogDescriptionSchema = z
  .string()
  .trim()
  .min(20, "Description must contain at least 20 characters.")
  .max(320, "Description must not exceed 320 characters.");

const blogContentMarkdownSchema = z
  .string()
  .trim()
  .min(100, "Article content must contain at least 100 characters.");

export const createBlogDraftSchema = z.object({
  title: blogTitleSchema,
  slug: blogSlugSchema,
  description: blogDescriptionSchema,
  contentMarkdown: blogContentMarkdownSchema,
});

export const updateBlogDraftSchema = z
  .object({
    title: blogTitleSchema.optional(),
    slug: blogSlugSchema.optional(),
    description: blogDescriptionSchema.optional(),
    contentMarkdown: blogContentMarkdownSchema.optional(),

    changeSummary: z
      .string()
      .trim()
      .min(3, "Change summary must contain at least 3 characters.")
      .max(500, "Change summary must not exceed 500 characters."),
  })
  .refine(
    (input) =>
      input.title !== undefined ||
      input.slug !== undefined ||
      input.description !== undefined ||
      input.contentMarkdown !== undefined,
    {
      message: "At least one blog post field must be updated.",
      path: ["title"],
    },
  );

export type CreateBlogDraftInput = z.infer<
  typeof createBlogDraftSchema
>;

export type UpdateBlogDraftInput = z.infer<
  typeof updateBlogDraftSchema
>;
