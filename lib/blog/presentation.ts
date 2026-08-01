const WORDS_PER_MINUTE = 220;

/**
 * Produces a reasonable reading-time estimate from Markdown.
 *
 * This is intentionally an estimate rather than an exact duration.
 */
export function getReadingTimeMinutes(
  markdown: string,
): number {
  const plainText = markdown
    // Remove fenced code blocks.
    .replace(/```[\s\S]*?```/g, " ")

    // Remove inline code markers while keeping surrounding prose.
    .replace(/`([^`]+)`/g, "$1")

    // Remove images.
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")

    // Keep link labels but remove their URLs.
    .replace(
      /\[([^\]]+)\]\([^)]*\)/g,
      "$1",
    )

    // Remove basic Markdown punctuation.
    .replace(/[>#*_~|]/g, " ")

    // Normalize whitespace.
    .replace(/\s+/g, " ")
    .trim();

  if (!plainText) {
    return 1;
  }

  const wordCount =
    plainText.split(" ").filter(Boolean).length;

  return Math.max(
    1,
    Math.ceil(
      wordCount / WORDS_PER_MINUTE,
    ),
  );
}

/**
 * Formats public blog dates consistently.
 */
export function formatBlogDate(
  input: Date | string | null,
): string {
  if (!input) {
    return "";
  }

  const date =
    input instanceof Date
      ? input
      : new Date(input);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    },
  ).format(date);
}

/**
 * Returns a stable machine-readable date for <time dateTime="">.
 */
export function toIsoDate(
  input: Date | string | null,
): string | undefined {
  if (!input) {
    return undefined;
  }

  const date =
    input instanceof Date
      ? input
      : new Date(input);

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date.toISOString();
}
