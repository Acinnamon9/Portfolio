export class BlogPostNotFoundError extends Error {
  constructor(identifier: string) {
    super(`Blog post "${identifier}" was not found.`);
    this.name = "BlogPostNotFoundError";
  }
}

export class BlogSlugConflictError extends Error {
  constructor(slug: string) {
    super(`A blog post with slug "${slug}" already exists.`);
    this.name = "BlogSlugConflictError";
  }
}

export class BlogPostNotDraftError extends Error {
  constructor(id: string, status: string) {
    super(
      `Blog post "${id}" cannot be edited because its current status is "${status}".`,
    );
    this.name = "BlogPostNotDraftError";
  }
}

export class BlogPostAlreadyPublishedError extends Error {
  constructor(id: string) {
    super(`Blog post "${id}" is already published.`);
    this.name = "BlogPostAlreadyPublishedError";
  }
}

export class BlogPostArchivedError extends Error {
  constructor(id: string) {
    super(
      `Blog post "${id}" is archived and cannot be published directly.`,
    );
    this.name = "BlogPostArchivedError";
  }
}

export class BlogRevisionConflictError extends Error {
  constructor(postId: string) {
    super(
      `A concurrent revision conflict occurred for blog post "${postId}". Retry the update.`,
    );
    this.name = "BlogRevisionConflictError";
  }
}
