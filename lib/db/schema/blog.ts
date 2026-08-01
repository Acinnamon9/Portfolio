import {
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const blogPostStatusEnum = pgEnum(
  "blog_post_status",
  ["draft", "published", "archived"],
);

export const blogPosts = pgTable(
  "blog_posts",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    slug: text("slug")
      .notNull(),

    title: text("title")
      .notNull(),

    description: text("description")
      .notNull(),

    contentMarkdown: text("content_markdown")
      .notNull(),

    status: blogPostStatusEnum("status")
      .default("draft")
      .notNull(),

    publishedAt: timestamp("published_at", {
      withTimezone: true,
    }),

    scheduledFor: timestamp("scheduled_for", {
      withTimezone: true,
    }),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("blog_posts_slug_unique")
      .on(table.slug),

    index("blog_posts_status_idx")
      .on(table.status),

    index("blog_posts_published_at_idx")
      .on(table.publishedAt),
  ],
);

export const blogPostRevisions = pgTable(
  "blog_post_revisions",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    postId: uuid("post_id")
      .notNull()
      .references(() => blogPosts.id, {
        onDelete: "cascade",
      }),

    revisionNumber: integer("revision_number")
      .notNull(),

    title: text("title")
      .notNull(),

    description: text("description")
      .notNull(),

    contentMarkdown: text("content_markdown")
      .notNull(),

    changeSummary: text("change_summary"),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex(
      "blog_post_revisions_post_revision_unique",
    ).on(
      table.postId,
      table.revisionNumber,
    ),

    index("blog_post_revisions_post_id_idx")
      .on(table.postId),
  ],
);

export const blogTags = pgTable(
  "blog_tags",
  {
    id: integer("id")
      .primaryKey()
      .generatedAlwaysAsIdentity(),

    name: text("name")
      .notNull(),

    slug: text("slug")
      .notNull(),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("blog_tags_name_unique")
      .on(table.name),

    uniqueIndex("blog_tags_slug_unique")
      .on(table.slug),
  ],
);

export const blogPostTags = pgTable(
  "blog_post_tags",
  {
    postId: uuid("post_id")
      .notNull()
      .references(() => blogPosts.id, {
        onDelete: "cascade",
      }),

    tagId: integer("tag_id")
      .notNull()
      .references(() => blogTags.id, {
        onDelete: "cascade",
      }),
  },
  (table) => [
    primaryKey({
      columns: [
        table.postId,
        table.tagId,
      ],
      name: "blog_post_tags_pk",
    }),

    index("blog_post_tags_tag_id_idx")
      .on(table.tagId),
  ],
);

export type BlogPost =
  typeof blogPosts.$inferSelect;

export type NewBlogPost =
  typeof blogPosts.$inferInsert;

export type BlogPostRevision =
  typeof blogPostRevisions.$inferSelect;

export type BlogTag =
  typeof blogTags.$inferSelect;
