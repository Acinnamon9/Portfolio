CREATE TYPE "public"."blog_post_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TABLE "blog_post_revisions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"post_id" uuid NOT NULL,
	"revision_number" integer NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"content_markdown" text NOT NULL,
	"change_summary" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blog_post_tags" (
	"post_id" uuid NOT NULL,
	"tag_id" integer NOT NULL,
	CONSTRAINT "blog_post_tags_pk" PRIMARY KEY("post_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "blog_posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"content_markdown" text NOT NULL,
	"status" "blog_post_status" DEFAULT 'draft' NOT NULL,
	"published_at" timestamp with time zone,
	"scheduled_for" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blog_tags" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "blog_tags_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "blog_post_revisions" ADD CONSTRAINT "blog_post_revisions_post_id_blog_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_post_tags" ADD CONSTRAINT "blog_post_tags_post_id_blog_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_post_tags" ADD CONSTRAINT "blog_post_tags_tag_id_blog_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."blog_tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "blog_post_revisions_post_revision_unique" ON "blog_post_revisions" USING btree ("post_id","revision_number");--> statement-breakpoint
CREATE INDEX "blog_post_revisions_post_id_idx" ON "blog_post_revisions" USING btree ("post_id");--> statement-breakpoint
CREATE INDEX "blog_post_tags_tag_id_idx" ON "blog_post_tags" USING btree ("tag_id");--> statement-breakpoint
CREATE UNIQUE INDEX "blog_posts_slug_unique" ON "blog_posts" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "blog_posts_status_idx" ON "blog_posts" USING btree ("status");--> statement-breakpoint
CREATE INDEX "blog_posts_published_at_idx" ON "blog_posts" USING btree ("published_at");--> statement-breakpoint
CREATE UNIQUE INDEX "blog_tags_name_unique" ON "blog_tags" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "blog_tags_slug_unique" ON "blog_tags" USING btree ("slug");