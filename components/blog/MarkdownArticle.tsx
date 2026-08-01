import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownArticleProps = {
  markdown: string;
  title: string;
};

function normalizeHeading(
  value: string,
): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

/**
 * GPT-generated Markdown may include the article title as its first
 * H1 even though the public page already renders the database title.
 *
 * We remove the leading H1 only when it matches the stored title.
 */
function removeDuplicateLeadingTitle(
  markdown: string,
  title: string,
): string {
  const trimmed =
    markdown.trimStart();

  const newlineIndex =
    trimmed.indexOf("\n");

  const firstLine =
    newlineIndex === -1
      ? trimmed
      : trimmed.slice(0, newlineIndex);

  const headingMatch =
    firstLine.match(/^#\s+(.+?)\s*$/);

  if (!headingMatch) {
    return markdown;
  }

  const markdownHeading =
    normalizeHeading(headingMatch[1]);

  const articleTitle =
    normalizeHeading(title);

  if (markdownHeading !== articleTitle) {
    return markdown;
  }

  return newlineIndex === -1
    ? ""
    : trimmed
        .slice(newlineIndex + 1)
        .trimStart();
}

export default function MarkdownArticle({
  markdown,
  title,
}: MarkdownArticleProps) {
  const renderedMarkdown =
    removeDuplicateLeadingTitle(
      markdown,
      title,
    );

  return (
    <div
      className="
        max-w-none
        text-[1.0625rem] leading-8
        text-foreground/75

        [&_p]:mt-6

        [&_h1]:mt-14
        [&_h1]:text-4xl
        [&_h1]:font-semibold
        [&_h1]:leading-tight
        [&_h1]:tracking-[-0.04em]
        [&_h1]:text-foreground

        [&_h2]:mt-14
        [&_h2]:border-t
        [&_h2]:border-foreground/10
        [&_h2]:pt-10
        [&_h2]:text-3xl
        [&_h2]:font-semibold
        [&_h2]:leading-tight
        [&_h2]:tracking-[-0.035em]
        [&_h2]:text-foreground

        [&_h3]:mt-10
        [&_h3]:text-2xl
        [&_h3]:font-semibold
        [&_h3]:leading-tight
        [&_h3]:tracking-[-0.025em]
        [&_h3]:text-foreground

        [&_h4]:mt-8
        [&_h4]:text-xl
        [&_h4]:font-semibold
        [&_h4]:text-foreground

        [&_strong]:font-semibold
        [&_strong]:text-foreground

        [&_em]:text-foreground/80

        [&_a]:font-medium
        [&_a]:text-foreground
        [&_a]:underline
        [&_a]:decoration-foreground/30
        [&_a]:underline-offset-4
        hover:[&_a]:decoration-foreground

        [&_ul]:mt-6
        [&_ul]:list-disc
        [&_ul]:space-y-2
        [&_ul]:pl-6

        [&_ol]:mt-6
        [&_ol]:list-decimal
        [&_ol]:space-y-2
        [&_ol]:pl-6

        [&_li]:pl-1

        [&_blockquote]:mt-8
        [&_blockquote]:border-l-2
        [&_blockquote]:border-foreground
        [&_blockquote]:bg-foreground/[0.035]
        [&_blockquote]:px-6
        [&_blockquote]:py-4
        [&_blockquote]:text-foreground/65

        [&_hr]:my-12
        [&_hr]:border-0
        [&_hr]:border-t
        [&_hr]:border-foreground/15

        [&_pre]:mt-8
        [&_pre]:overflow-x-auto
        [&_pre]:border
        [&_pre]:border-foreground/15
        [&_pre]:bg-foreground
        [&_pre]:p-5
        [&_pre]:text-sm
        [&_pre]:leading-6
        [&_pre]:text-background

        [&_code]:rounded-sm
        [&_code]:bg-foreground/[0.07]
        [&_code]:px-1.5
        [&_code]:py-0.5
        [&_code]:font-mono
        [&_code]:text-[0.92em]
        [&_code]:text-foreground

        [&_pre_code]:bg-transparent
        [&_pre_code]:p-0
        [&_pre_code]:text-inherit

        [&_table]:mt-8
        [&_table]:w-full
        [&_table]:border-collapse
        [&_table]:text-left
        [&_table]:text-sm

        [&_th]:border
        [&_th]:border-foreground/15
        [&_th]:bg-foreground/[0.05]
        [&_th]:px-4
        [&_th]:py-3
        [&_th]:font-semibold
        [&_th]:text-foreground

        [&_td]:border
        [&_td]:border-foreground/15
        [&_td]:px-4
        [&_td]:py-3
        [&_td]:align-top

        [&_img]:mt-8
        [&_img]:h-auto
        [&_img]:max-w-full
        [&_img]:border
        [&_img]:border-foreground/10
      "
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a({
            href,
            children,
            ...props
          }) {
            const isExternal =
              href?.startsWith("http://") ||
              href?.startsWith("https://");

            return (
              <a
                href={href}
                target={
                  isExternal
                    ? "_blank"
                    : undefined
                }
                rel={
                  isExternal
                    ? "noopener noreferrer"
                    : undefined
                }
                {...props}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {renderedMarkdown}
      </ReactMarkdown>
    </div>
  );
}
