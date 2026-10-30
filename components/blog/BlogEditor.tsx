"use client";

import { uploadPresigned } from "@vercel/blob/client";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  Eye,
  FileImage,
  FilePlus2,
  LockKeyhole,
  LogOut,
  Save,
  Send,
  SquarePen,
} from "lucide-react";
import Link from "next/link";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImageUrl: string | null;
  contentMarkdown: string;
  status: "draft" | "published";
  publishedAt: string | null;
  updatedAt: string;
};

type PostResponse = { post: BlogPost };
type PostsResponse = { posts: BlogPost[] };
type EditorValues = {
  title: string;
  slug: string;
  description: string;
  coverImageUrl: string;
  contentMarkdown: string;
};

type UploadTarget = "inline" | "cover";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const IMAGE_EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

const EMPTY_POST: EditorValues = {
  title: "",
  slug: "",
  description: "",
  coverImageUrl: "",
  contentMarkdown: "",
};

async function requestJson<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const response = await fetch(path, {
    ...init,
    cache: "no-store",
    credentials: "same-origin",
    headers: init.body ? { "Content-Type": "application/json" } : undefined,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      data?.error?.message ?? data?.error ?? "Something went wrong.";
    throw new Error(message);
  }

  return data as T;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

function formatUpdatedAt(value: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  }).format(new Date(value));
}

export default function BlogEditor() {
  const [authState, setAuthState] = useState<"checking" | "signed-out" | "signed-in">("checking");
  const [password, setPassword] = useState("");
  const [drafts, setDrafts] = useState<BlogPost[]>([]);
  const [published, setPublished] = useState<BlogPost[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<BlogPost["status"] | null>(null);
  const [values, setValues] = useState<EditorValues>(EMPTY_POST);
  const [slugEdited, setSlugEdited] = useState(false);
  const [preview, setPreview] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const articleTextareaRef = useRef<HTMLTextAreaElement>(null);
  const uploadTargetRef = useRef<UploadTarget>("inline");
  const articleSelectionRef = useRef({ start: 0, end: 0 });

  const loadPosts = useCallback(async () => {
    const [draftResponse, publishedResponse] = await Promise.all([
      requestJson<PostsResponse>("/api/blog/posts?status=draft"),
      requestJson<PostsResponse>("/api/blog/posts?status=published"),
    ]);
    setDrafts(draftResponse.posts);
    setPublished(publishedResponse.posts);
  }, []);

  useEffect(() => {
    let active = true;

    requestJson<{ authenticated: boolean }>("/api/blog/session")
      .then(async () => {
        if (!active) return;
        setAuthState("signed-in");
        await loadPosts();
      })
      .catch((loadError: unknown) => {
        if (!active) return;
        if (loadError instanceof Error && loadError.message !== "Something went wrong.") {
          setError(loadError.message);
        }
        setAuthState("signed-out");
      });

    return () => {
      active = false;
    };
  }, [loadPosts]);

  const startNewDraft = () => {
    setSelectedId(null);
    setSelectedStatus(null);
    setValues(EMPTY_POST);
    setSlugEdited(false);
    setPreview(false);
    setError("");
    setNotice("");
  };

  const selectPost = (post: BlogPost) => {
    setSelectedId(post.id);
    setSelectedStatus(post.status);
    setValues({
      title: post.title,
      slug: post.slug,
      description: post.description,
      coverImageUrl: post.coverImageUrl ?? "",
      contentMarkdown: post.contentMarkdown,
    });
    setSlugEdited(true);
    setPreview(false);
    setError("");
    setNotice("");
  };

  const refreshPosts = async () => {
    await loadPosts();
  };

  const rememberArticleSelection = () => {
    const textarea = articleTextareaRef.current;
    if (textarea) {
      articleSelectionRef.current = {
        start: textarea.selectionStart,
        end: textarea.selectionEnd,
      };
    }
  };

  const openImagePicker = (target: UploadTarget) => {
    if (target === "inline") {
      rememberArticleSelection();
    }
    uploadTargetRef.current = target;
    uploadInputRef.current?.click();
  };

  const uploadImage = async (file: File, target: UploadTarget) => {
    const extension = IMAGE_EXTENSIONS[file.type];

    if (!extension) {
      setError("Choose a JPEG, PNG, WebP, or GIF image.");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setError("Images must be 5 MB or smaller.");
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setError("");
    setNotice("");

    try {
      const blob = await uploadPresigned(
        `blog-images/${crypto.randomUUID()}.${extension}`,
        file,
        {
          access: "public",
          handleUploadUrl: "/api/blog/uploads",
          multipart: false,
          onUploadProgress: ({ percentage }) => {
            setUploadProgress(Math.round(percentage));
          },
        },
      );

      if (target === "cover") {
        setValues((current) => ({ ...current, coverImageUrl: blob.url }));
        setNotice("Cover image uploaded. Save the draft to keep the image URL.");
      } else {
        const filename = file.name.replace(/\.[^.]+$/, "");
        const altText =
          filename
            .replace(/[-_]+/g, " ")
            .replace(/[\[\]\r\n]/g, " ")
            .trim() || "Article image";
        const markdown = `![${altText}](${blob.url})`;
        const { start, end } = articleSelectionRef.current;
        let nextCaret = start + markdown.length;

        setValues((current) => {
          const safeStart = Math.min(start, current.contentMarkdown.length);
          const safeEnd = Math.min(Math.max(end, safeStart), current.contentMarkdown.length);
          const before = current.contentMarkdown.slice(0, safeStart);
          const after = current.contentMarkdown.slice(safeEnd);
          const leadingBreak = before.length > 0 && !before.endsWith("\n") ? "\n" : "";
          const trailingBreak = after.length > 0 && !after.startsWith("\n") ? "\n" : "";
          const insertion = `${leadingBreak}${markdown}${trailingBreak}`;
          nextCaret = safeStart + leadingBreak.length + markdown.length;

          return {
            ...current,
            contentMarkdown: before + insertion + after,
          };
        });

        setPreview(false);
        window.requestAnimationFrame(() => {
          const textarea = articleTextareaRef.current;
          textarea?.focus();
          textarea?.setSelectionRange(nextCaret, nextCaret);
          articleSelectionRef.current = { start: nextCaret, end: nextCaret };
        });
        setNotice("Image uploaded and inserted into the article.");
      }
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Image upload failed.");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleImagePickerChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";

    if (file) {
      void uploadImage(file, uploadTargetRef.current);
    }
  };

  const handleArticleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (canEdit && event.dataTransfer.types.includes("Files")) {
      setIsDraggingImage(true);
    }
  };

  const handleArticleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingImage(false);

    if (!canEdit || uploading) return;

    const file = event.dataTransfer.files[0];
    if (file) {
      rememberArticleSelection();
      void uploadImage(file, "inline");
    }
  };

  const handleArticleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget;
    if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
      setIsDraggingImage(false);
    }
  };

  const signIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError("");

    try {
      await requestJson("/api/blog/session", {
        method: "POST",
        body: JSON.stringify({ password }),
      });
      setPassword("");
      setAuthState("signed-in");
      await refreshPosts();
    } catch (signInError) {
      setError(signInError instanceof Error ? signInError.message : "Could not sign in.");
    } finally {
      setBusy(false);
    }
  };

  const signOut = async () => {
    await requestJson("/api/blog/session", { method: "DELETE" }).catch(() => undefined);
    setAuthState("signed-out");
    startNewDraft();
  };

  const persistDraft = async (): Promise<BlogPost> => {
    const payload = {
      ...values,
      coverImageUrl: values.coverImageUrl.trim() || null,
      changeSummary: "Updated in the website blog editor",
    };

    const result = selectedId
      ? await requestJson<PostResponse>(`/api/blog/posts/${selectedId}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        })
      : await requestJson<PostResponse>("/api/blog/posts", {
          method: "POST",
        body: JSON.stringify({
          ...values,
          coverImageUrl: values.coverImageUrl.trim() || null,
        }),
        });

    setSelectedId(result.post.id);
    setSelectedStatus("draft");
    setValues({
      title: result.post.title,
      slug: result.post.slug,
      description: result.post.description,
      coverImageUrl: result.post.coverImageUrl ?? "",
      contentMarkdown: result.post.contentMarkdown,
    });
    setSlugEdited(true);
    await refreshPosts();
    return result.post;
  };

  const saveDraft = async () => {
    setBusy(true);
    setError("");
    setNotice("");

    try {
      await persistDraft();
      setNotice("Draft saved.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Could not save the draft.");
    } finally {
      setBusy(false);
    }
  };

  const publishDraft = async () => {
    if (!window.confirm("Publish this article? It will become visible on your public blog.")) {
      return;
    }

    setBusy(true);
    setError("");
    setNotice("");

    try {
      const post = await persistDraft();
      await requestJson(`/api/blog/posts/${post.id}/publish`, {
        method: "POST",
        body: JSON.stringify({ confirmation: "PUBLISH" }),
      });
      await refreshPosts();
      startNewDraft();
      setNotice("Article published.");
    } catch (publishError) {
      setError(publishError instanceof Error ? publishError.message : "Could not publish the article.");
    } finally {
      setBusy(false);
    }
  };

  const reopenDraft = async () => {
    if (!selectedId || !window.confirm("Move this article back to drafts? It will no longer appear publicly.")) {
      return;
    }

    setBusy(true);
    setError("");
    setNotice("");

    try {
      const response = await requestJson<PostResponse>(`/api/blog/posts/${selectedId}/draft`, {
        method: "POST",
      });
      await refreshPosts();
      selectPost(response.post);
      setNotice("Article moved to drafts. It is no longer public.");
    } catch (reopenError) {
      setError(reopenError instanceof Error ? reopenError.message : "Could not move the article to drafts.");
    } finally {
      setBusy(false);
    }
  };

  const updateTitle = (title: string) => {
    setValues((current) => ({
      ...current,
      title,
      slug: slugEdited ? current.slug : slugify(title),
    }));
  };

  if (authState === "checking") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
        <p className="text-sm text-foreground/55">Checking editor session…</p>
      </main>
    );
  }

  if (authState === "signed-out") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4 py-16 text-foreground">
        <div className="w-full max-w-md border border-foreground/15 bg-background p-7 sm:p-9">
          <LockKeyhole size={22} className="text-foreground/55" aria-hidden="true" />
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/45">
            Private workspace
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
            Blog editor
          </h1>
          <p className="mt-3 text-sm leading-6 text-foreground/60">
            Sign in with the private editor password configured for this site.
          </p>

          <form onSubmit={signIn} className="mt-7 space-y-4">
            <label className="block text-sm font-medium" htmlFor="editor-password">
              Editor password
            </label>
            <input
              id="editor-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="min-h-12 w-full border border-foreground/20 bg-background px-4 text-base outline-none focus:border-foreground"
            />
            {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
            <button
              type="submit"
              disabled={busy}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-foreground px-5 text-sm font-semibold text-background transition-opacity hover:opacity-80 disabled:opacity-50"
            >
              <LockKeyhole size={16} aria-hidden="true" />
              {busy ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <Link href="/" className="mt-6 inline-flex items-center gap-2 text-sm text-foreground/55 hover:text-foreground">
            <ArrowLeft size={15} aria-hidden="true" /> Back to the website
          </Link>
        </div>
      </main>
    );
  }

  const canEdit = selectedStatus !== "published";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <input
        ref={uploadInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleImagePickerChange}
        className="hidden"
        tabIndex={-1}
        aria-hidden="true"
      />
      <header className="border-b border-foreground/10 px-4 py-5 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/45">
              Private workspace
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
              Blog editor
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="hidden items-center gap-2 text-sm text-foreground/60 hover:text-foreground sm:inline-flex">
              Public blog <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <button type="button" onClick={signOut} className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground">
              <LogOut size={16} aria-hidden="true" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] gap-8 px-4 py-6 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-10 lg:py-10">
        <aside className="space-y-8">
          <button
            type="button"
            onClick={startNewDraft}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-foreground px-4 text-sm font-semibold text-background transition-opacity hover:opacity-80"
          >
            <FilePlus2 size={17} aria-hidden="true" /> New draft
          </button>

          <div>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/40">
              Drafts · {drafts.length}
            </h2>
            <div className="space-y-1">
              {drafts.map((post) => (
                <button
                  key={post.id}
                  type="button"
                  onClick={() => selectPost(post)}
                  className={`block w-full border-l-2 px-3 py-3 text-left text-sm transition-colors ${selectedId === post.id ? "border-foreground bg-foreground/[0.05] text-foreground" : "border-transparent text-foreground/60 hover:bg-foreground/[0.035] hover:text-foreground"}`}
                >
                  <span className="block font-medium">{post.title}</span>
                  <span className="mt-1 block text-xs text-foreground/40">Edited {formatUpdatedAt(post.updatedAt)}</span>
                </button>
              ))}
              {drafts.length === 0 && <p className="px-3 py-2 text-sm text-foreground/40">No drafts yet.</p>}
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/40">
              Published · {published.length}
            </h2>
            <div className="space-y-1">
              {published.map((post) => (
                <button
                  key={post.id}
                  type="button"
                  onClick={() => selectPost(post)}
                  className={`block w-full border-l-2 px-3 py-3 text-left text-sm transition-colors ${selectedId === post.id ? "border-foreground bg-foreground/[0.05] text-foreground" : "border-transparent text-foreground/60 hover:bg-foreground/[0.035] hover:text-foreground"}`}
                >
                  <span className="block font-medium">{post.title}</span>
                  <span className="mt-1 block text-xs text-foreground/40">Published</span>
                </button>
              ))}
              {published.length === 0 && <p className="px-3 py-2 text-sm text-foreground/40">No published articles yet.</p>}
            </div>
          </div>
        </aside>

        <section className="min-w-0 border border-foreground/12 p-4 sm:p-7 lg:p-9">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-foreground/10 pb-5">
            <div className="flex items-center gap-3">
              <SquarePen size={18} className="text-foreground/45" aria-hidden="true" />
              <h2 className="text-lg font-semibold">{selectedId ? (selectedStatus === "published" ? "Published article" : "Edit draft") : "New article"}</h2>
            </div>
            {selectedStatus === "published" && (
              <button type="button" onClick={reopenDraft} disabled={busy} className="min-h-10 border border-foreground/20 px-4 text-sm font-medium hover:border-foreground disabled:opacity-50">
                Move to drafts to edit
              </button>
            )}
          </div>

          {error && <p role="alert" className="mt-5 border border-red-700/20 bg-red-700/[0.04] px-4 py-3 text-sm text-red-800">{error}</p>}
          {notice && <p role="status" className="mt-5 border border-foreground/10 bg-foreground/[0.035] px-4 py-3 text-sm text-foreground/70">{notice}</p>}

          <div className="mt-6 grid gap-6">
            <label className="block">
              <span className="text-sm font-medium">Title</span>
              <input
                type="text"
                minLength={5}
                maxLength={160}
                disabled={!canEdit || busy}
                value={values.title}
                onChange={(event) => updateTitle(event.target.value)}
                placeholder="A clear, specific article title"
                className="mt-2 min-h-12 w-full border border-foreground/15 bg-background px-4 text-base outline-none placeholder:text-foreground/30 focus:border-foreground disabled:opacity-60"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium">URL slug</span>
              <div className="mt-2 flex min-h-12 items-center border border-foreground/15 focus-within:border-foreground">
                <span className="shrink-0 pl-4 text-sm text-foreground/40">/blog/</span>
                <input
                  type="text"
                  minLength={3}
                  maxLength={120}
                  disabled={!canEdit || busy}
                  value={values.slug}
                  onChange={(event) => {
                    setSlugEdited(true);
                    setValues((current) => ({ ...current, slug: event.target.value }));
                  }}
                  placeholder="article-slug"
                  className="h-11 min-w-0 flex-1 bg-transparent px-2 text-sm outline-none disabled:opacity-60"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-medium">Short description</span>
              <textarea
                rows={3}
                minLength={20}
                maxLength={320}
                disabled={!canEdit || busy}
                value={values.description}
                onChange={(event) => setValues((current) => ({ ...current, description: event.target.value }))}
                placeholder="A 1–2 sentence summary shown on the blog and homepage."
                className="mt-2 w-full resize-y border border-foreground/15 bg-background px-4 py-3 text-sm leading-6 outline-none placeholder:text-foreground/30 focus:border-foreground disabled:opacity-60"
              />
              <span className="mt-1 block text-right text-xs text-foreground/40">{values.description.length}/320</span>
            </label>

            <div>
              <label className="text-sm font-medium" htmlFor="cover-image-url">
                Cover image <span className="font-normal text-foreground/40">(optional)</span>
              </label>
              <input
                id="cover-image-url"
                type="url"
                disabled={!canEdit || busy}
                value={values.coverImageUrl}
                onChange={(event) => setValues((current) => ({ ...current, coverImageUrl: event.target.value }))}
                placeholder="https://example.com/article-cover.jpg"
                className="mt-2 min-h-12 w-full border border-foreground/15 bg-background px-4 text-sm outline-none placeholder:text-foreground/30 focus:border-foreground disabled:opacity-60"
              />
              <span className="mt-2 block text-xs leading-5 text-foreground/45">
                Paste an image URL or upload a cover image from your device.
              </span>
              <button
                type="button"
                onClick={() => openImagePicker("cover")}
                disabled={!canEdit || busy || uploading}
                className="mt-3 inline-flex min-h-10 items-center gap-2 border border-foreground/15 px-3 text-xs font-medium transition-colors hover:border-foreground disabled:opacity-50"
              >
                <FileImage size={15} aria-hidden="true" />
                Upload cover image
              </button>
              {/^https?:\/\//i.test(values.coverImageUrl) && (
                <div className="relative mt-3 aspect-[16/9] max-w-2xl overflow-hidden border border-foreground/10 bg-foreground/[0.03]">
                  <Image
                    src={values.coverImageUrl}
                    alt={values.title ? `Cover image for ${values.title}` : "Article cover image preview"}
                    fill
                    unoptimized
                    sizes="(max-width: 672px) 100vw, 672px"
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <label htmlFor="article-content" className="text-sm font-medium">Article</label>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="hidden text-xs text-foreground/40 sm:block">Markdown supported · drag images into the editor</p>
                  {canEdit && (
                    <button
                      type="button"
                      onClick={() => openImagePicker("inline")}
                      disabled={busy || uploading}
                      className="inline-flex min-h-9 items-center gap-2 border border-foreground/15 px-3 text-xs font-medium hover:border-foreground disabled:opacity-50"
                    >
                      <FileImage size={14} aria-hidden="true" /> Upload image
                    </button>
                  )}
                  <button type="button" onClick={() => setPreview((current) => !current)} className="inline-flex min-h-9 items-center gap-2 border border-foreground/15 px-3 text-xs font-medium hover:border-foreground">
                    <Eye size={14} aria-hidden="true" /> {preview ? "Write" : "Preview"}
                  </button>
                </div>
              </div>

              <div
                onDragOver={handleArticleDragOver}
                onDragLeave={handleArticleDragLeave}
                onDrop={handleArticleDrop}
                className="relative mt-2"
              >
                {preview ? (
                  <article className="min-h-[420px] border border-foreground/15 bg-background p-5 sm:p-8">
                    {values.title && <h1 className="mb-6 text-3xl font-semibold tracking-[-0.04em]">{values.title}</h1>}
                    <div className="docs-prose">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{values.contentMarkdown || "Your article preview will appear here."}</ReactMarkdown>
                    </div>
                  </article>
                ) : (
                  <textarea
                    ref={articleTextareaRef}
                    id="article-content"
                    rows={20}
                    minLength={100}
                    disabled={!canEdit || busy || uploading}
                    value={values.contentMarkdown}
                    onSelect={rememberArticleSelection}
                    onClick={rememberArticleSelection}
                    onKeyUp={rememberArticleSelection}
                    onBlur={rememberArticleSelection}
                    onChange={(event) => {
                      articleSelectionRef.current = {
                        start: event.currentTarget.selectionStart,
                        end: event.currentTarget.selectionEnd,
                      };
                      setValues((current) => ({ ...current, contentMarkdown: event.target.value }));
                    }}
                    placeholder={`Write your article in Markdown…\n\n## A section heading\n\nYour article text goes here.\n\nDrag an image here or upload it to insert it at the cursor.`}
                    className="w-full resize-y border border-foreground/15 bg-background px-4 py-4 font-mono text-sm leading-7 outline-none placeholder:text-foreground/30 focus:border-foreground disabled:opacity-60"
                  />
                )}
                {isDraggingImage && canEdit && (
                  <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center border-2 border-dashed border-foreground bg-background/95 p-6 text-center text-sm font-semibold">
                    Drop image to upload and insert it here
                  </div>
                )}
              </div>
              {uploading && (
                <p role="status" className="mt-2 text-xs text-foreground/55">
                  Uploading image… {uploadProgress}%
                </p>
              )}
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-foreground/10 pt-5">
            <p className="text-xs text-foreground/45">Drafts stay private until you publish.</p>
            {canEdit && (
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={saveDraft} disabled={busy} className="inline-flex min-h-11 items-center gap-2 border border-foreground/20 px-4 text-sm font-semibold transition-colors hover:border-foreground disabled:opacity-50">
                  <Save size={16} aria-hidden="true" /> {busy ? "Saving…" : "Save draft"}
                </button>
                <button type="button" onClick={publishDraft} disabled={busy} className="inline-flex min-h-11 items-center gap-2 bg-foreground px-4 text-sm font-semibold text-background transition-opacity hover:opacity-80 disabled:opacity-50">
                  <Send size={16} aria-hidden="true" /> Publish
                </button>
              </div>
            )}
            {selectedStatus === "published" && (
              <Link href={`/blog/${values.slug}`} target="_blank" className="inline-flex min-h-11 items-center gap-2 border border-foreground/20 px-4 text-sm font-semibold hover:border-foreground">
                View article <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
