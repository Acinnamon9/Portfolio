import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
) {
  const origin =
    new URL(request.url).origin;

  const schema = {
    openapi: "3.0.3",

    info: {
      title:
        "Abhijeet Portfolio Blog API",

      version: "1.0.0",

      description:
        "Authenticated editorial API for creating, retrieving, revising, publishing, unpublishing, and archiving technical articles in Abhijeet Singh's portfolio.",
    },

    servers: [
      {
        url: origin,
        description:
          "Portfolio application",
      },
    ],

    security: [
      {
        BearerAuth: [],
      },
    ],

    paths: {
      "/api/blog/posts": {
        get: {
          operationId:
            "listBlogPosts",

          summary:
            "List blog posts",

          description:
            "Lists draft or published blog posts. Draft is the default status filter.",

          "x-openai-isConsequential":
            false,

          parameters: [
            {
              name: "status",
              in: "query",
              required: false,

              description:
                "Publication status to list.",

              schema: {
                type: "string",
                enum: [
                  "draft",
                  "published",
                ],
                default: "draft",
              },
            },
          ],

          responses: {
            "200": {
              description:
                "Blog posts returned successfully.",

              content: {
                "application/json": {
                  schema: {
                    $ref:
                      "#/components/schemas/BlogPostListResponse",
                  },
                },
              },
            },

            "401": {
              $ref:
                "#/components/responses/Unauthorized",
            },

            "500": {
              $ref:
                "#/components/responses/InternalError",
            },
          },
        },

        post: {
          operationId:
            "createBlogDraft",

          summary:
            "Create a blog draft",

          description:
            "Creates a new article in draft state. This operation cannot publish an article.",

          "x-openai-isConsequential":
            false,

          requestBody: {
            required: true,

            content: {
              "application/json": {
                schema: {
                  $ref:
                    "#/components/schemas/CreateBlogDraftRequest",
                },
              },
            },
          },

          responses: {
            "201": {
              description:
                "Draft created successfully.",

              content: {
                "application/json": {
                  schema: {
                    $ref:
                      "#/components/schemas/BlogPostResponse",
                  },
                },
              },
            },

            "400": {
              $ref:
                "#/components/responses/ValidationError",
            },

            "401": {
              $ref:
                "#/components/responses/Unauthorized",
            },

            "409": {
              $ref:
                "#/components/responses/Conflict",
            },

            "500": {
              $ref:
                "#/components/responses/InternalError",
            },
          },
        },
      },

      "/api/blog/posts/{id}": {
        get: {
          operationId:
            "getBlogPost",

          summary:
            "Retrieve one blog post",

          description:
            "Retrieves the current editorial version of a blog post by UUID, including drafts and archived posts.",

          "x-openai-isConsequential":
            false,

          parameters: [
            {
              $ref:
                "#/components/parameters/BlogPostId",
            },
          ],

          responses: {
            "200": {
              description:
                "Blog post returned successfully.",

              content: {
                "application/json": {
                  schema: {
                    $ref:
                      "#/components/schemas/BlogPostResponse",
                  },
                },
              },
            },

            "401": {
              $ref:
                "#/components/responses/Unauthorized",
            },

            "404": {
              $ref:
                "#/components/responses/NotFound",
            },

            "500": {
              $ref:
                "#/components/responses/InternalError",
            },
          },
        },

        patch: {
          operationId:
            "updateBlogDraft",

          summary:
            "Update a blog draft",

          description:
            "Updates a draft and automatically preserves the previous current version as an immutable revision. Published and archived posts cannot be edited through this operation.",

          "x-openai-isConsequential":
            false,

          parameters: [
            {
              $ref:
                "#/components/parameters/BlogPostId",
            },
          ],

          requestBody: {
            required: true,

            content: {
              "application/json": {
                schema: {
                  $ref:
                    "#/components/schemas/UpdateBlogDraftRequest",
                },
              },
            },
          },

          responses: {
            "200": {
              description:
                "Draft updated successfully.",

              content: {
                "application/json": {
                  schema: {
                    $ref:
                      "#/components/schemas/BlogPostResponse",
                  },
                },
              },
            },

            "400": {
              $ref:
                "#/components/responses/ValidationError",
            },

            "401": {
              $ref:
                "#/components/responses/Unauthorized",
            },

            "404": {
              $ref:
                "#/components/responses/NotFound",
            },

            "409": {
              $ref:
                "#/components/responses/Conflict",
            },

            "500": {
              $ref:
                "#/components/responses/InternalError",
            },
          },
        },
      },

      "/api/blog/posts/{id}/revisions": {
        get: {
          operationId:
            "listBlogPostRevisions",

          summary:
            "List article revisions",

          description:
            "Returns immutable historical versions of an article, newest revision first.",

          "x-openai-isConsequential":
            false,

          parameters: [
            {
              $ref:
                "#/components/parameters/BlogPostId",
            },
          ],

          responses: {
            "200": {
              description:
                "Revision history returned successfully.",

              content: {
                "application/json": {
                  schema: {
                    $ref:
                      "#/components/schemas/BlogRevisionListResponse",
                  },
                },
              },
            },

            "401": {
              $ref:
                "#/components/responses/Unauthorized",
            },

            "404": {
              $ref:
                "#/components/responses/NotFound",
            },

            "500": {
              $ref:
                "#/components/responses/InternalError",
            },
          },
        },
      },

      "/api/blog/posts/{id}/publish": {
        post: {
          operationId:
            "publishBlogPost",

          summary:
            "Publish a blog post",

          description:
            "Changes a draft to published state. The current article must be reviewed before this consequential operation is executed.",

          "x-openai-isConsequential":
            true,

          parameters: [
            {
              $ref:
                "#/components/parameters/BlogPostId",
            },
          ],

          requestBody: {
            required: true,

            content: {
              "application/json": {
                schema: {
                  $ref:
                    "#/components/schemas/PublishBlogPostRequest",
                },
              },
            },
          },

          responses: {
            "200": {
              description:
                "Blog post published successfully.",

              content: {
                "application/json": {
                  schema: {
                    $ref:
                      "#/components/schemas/BlogPostResponse",
                  },
                },
              },
            },

            "400": {
              $ref:
                "#/components/responses/ValidationError",
            },

            "401": {
              $ref:
                "#/components/responses/Unauthorized",
            },

            "404": {
              $ref:
                "#/components/responses/NotFound",
            },

            "409": {
              $ref:
                "#/components/responses/Conflict",
            },

            "500": {
              $ref:
                "#/components/responses/InternalError",
            },
          },
        },
      },

      "/api/blog/posts/{id}/archive": {
        post: {
          operationId:
            "archiveBlogPost",

          summary:
            "Archive a blog post",

          description:
            "Moves a draft or published article into archived state so it is no longer publicly visible.",

          "x-openai-isConsequential":
            true,

          parameters: [
            {
              $ref:
                "#/components/parameters/BlogPostId",
            },
          ],

          responses: {
            "200": {
              description:
                "Blog post archived successfully.",

              content: {
                "application/json": {
                  schema: {
                    $ref:
                      "#/components/schemas/BlogPostResponse",
                  },
                },
              },
            },

            "401": {
              $ref:
                "#/components/responses/Unauthorized",
            },

            "404": {
              $ref:
                "#/components/responses/NotFound",
            },

            "500": {
              $ref:
                "#/components/responses/InternalError",
            },
          },
        },
      },

      "/api/blog/posts/{id}/draft": {
        post: {
          operationId:
            "moveBlogPostToDraft",

          summary:
            "Move a blog post to draft",

          description:
            "Moves a published or archived article back into draft state. A published article becomes unavailable publicly.",

          "x-openai-isConsequential":
            true,

          parameters: [
            {
              $ref:
                "#/components/parameters/BlogPostId",
            },
          ],

          responses: {
            "200": {
              description:
                "Blog post moved to draft successfully.",

              content: {
                "application/json": {
                  schema: {
                    $ref:
                      "#/components/schemas/BlogPostResponse",
                  },
                },
              },
            },

            "401": {
              $ref:
                "#/components/responses/Unauthorized",
            },

            "404": {
              $ref:
                "#/components/responses/NotFound",
            },

            "500": {
              $ref:
                "#/components/responses/InternalError",
            },
          },
        },
      },
    },

    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",

          description:
            "Private blog API key configured in the Custom GPT Action authentication settings.",
        },
      },

      parameters: {
        BlogPostId: {
          name: "id",
          in: "path",
          required: true,

          description:
            "UUID of the blog post.",

          schema: {
            type: "string",
            format: "uuid",
          },
        },
      },

      schemas: {
        BlogPostStatus: {
          type: "string",

          enum: [
            "draft",
            "published",
            "archived",
          ],
        },

        BlogPost: {
          type: "object",

          required: [
            "id",
            "slug",
            "title",
            "description",
            "contentMarkdown",
            "status",
            "publishedAt",
            "scheduledFor",
            "createdAt",
            "updatedAt",
          ],

          properties: {
            id: {
              type: "string",
              format: "uuid",
            },

            slug: {
              type: "string",
              example:
                "hierarchy-aware-authorization",
            },

            title: {
              type: "string",
            },

            description: {
              type: "string",
            },

            contentMarkdown: {
              type: "string",

              description:
                "Complete article body in Markdown.",
            },

            status: {
              $ref:
                "#/components/schemas/BlogPostStatus",
            },

            publishedAt: {
              type: "string",
              format: "date-time",
              nullable: true,
            },

            scheduledFor: {
              type: "string",
              format: "date-time",
              nullable: true,
            },

            createdAt: {
              type: "string",
              format: "date-time",
            },

            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        BlogPostRevision: {
          type: "object",

          required: [
            "id",
            "postId",
            "revisionNumber",
            "title",
            "description",
            "contentMarkdown",
            "changeSummary",
            "createdAt",
          ],

          properties: {
            id: {
              type: "string",
              format: "uuid",
            },

            postId: {
              type: "string",
              format: "uuid",
            },

            revisionNumber: {
              type: "integer",
              minimum: 1,
            },

            title: {
              type: "string",
            },

            description: {
              type: "string",
            },

            contentMarkdown: {
              type: "string",
            },

            changeSummary: {
              type: "string",
              nullable: true,
            },

            createdAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        CreateBlogDraftRequest: {
          type: "object",

          additionalProperties: false,

          required: [
            "title",
            "slug",
            "description",
            "contentMarkdown",
          ],

          properties: {
            title: {
              type: "string",
              minLength: 5,
              maxLength: 160,
            },

            slug: {
              type: "string",
              minLength: 3,
              maxLength: 120,

              pattern:
                "^[a-z0-9]+(?:-[a-z0-9]+)*$",

              description:
                "Lowercase kebab-case URL slug.",
            },

            description: {
              type: "string",
              minLength: 20,
              maxLength: 320,
            },

            contentMarkdown: {
              type: "string",
              minLength: 100,

              description:
                "Complete article body in Markdown.",
            },
          },
        },

        UpdateBlogDraftRequest: {
          type: "object",

          additionalProperties: false,

          required: [
            "changeSummary",
          ],

          anyOf: [
            {
              required: [
                "title",
              ],
            },
            {
              required: [
                "slug",
              ],
            },
            {
              required: [
                "description",
              ],
            },
            {
              required: [
                "contentMarkdown",
              ],
            },
          ],

          properties: {
            title: {
              type: "string",
              minLength: 5,
              maxLength: 160,
            },

            slug: {
              type: "string",
              minLength: 3,
              maxLength: 120,

              pattern:
                "^[a-z0-9]+(?:-[a-z0-9]+)*$",
            },

            description: {
              type: "string",
              minLength: 20,
              maxLength: 320,
            },

            contentMarkdown: {
              type: "string",
              minLength: 100,
            },

            changeSummary: {
              type: "string",
              minLength: 3,
              maxLength: 500,

              description:
                "Concise explanation of what changed in this revision.",
            },
          },
        },

        PublishBlogPostRequest: {
          type: "object",

          additionalProperties: false,

          required: [
            "confirmation",
          ],

          properties: {
            confirmation: {
              type: "string",

              enum: [
                "PUBLISH",
              ],

              description:
                "Required explicit publication confirmation value.",
            },
          },
        },

        BlogPostResponse: {
          type: "object",

          required: [
            "post",
          ],

          properties: {
            post: {
              $ref:
                "#/components/schemas/BlogPost",
            },

            message: {
              type: "string",
            },
          },
        },

        BlogPostListResponse: {
          type: "object",

          required: [
            "posts",
            "count",
            "status",
          ],

          properties: {
            posts: {
              type: "array",

              items: {
                $ref:
                  "#/components/schemas/BlogPost",
              },
            },

            count: {
              type: "integer",
              minimum: 0,
            },

            status: {
              type: "string",

              enum: [
                "draft",
                "published",
              ],
            },
          },
        },

        BlogRevisionListResponse: {
          type: "object",

          required: [
            "revisions",
            "count",
          ],

          properties: {
            revisions: {
              type: "array",

              items: {
                $ref:
                  "#/components/schemas/BlogPostRevision",
              },
            },

            count: {
              type: "integer",
              minimum: 0,
            },
          },
        },

        ApiError: {
          type: "object",

          required: [
            "error",
          ],

          properties: {
            error: {
              type: "object",

              required: [
                "code",
                "message",
              ],

              properties: {
                code: {
                  type: "string",
                },

                message: {
                  type: "string",
                },

                details: {
                  nullable: true,
                },
              },
            },
          },
        },
      },

      responses: {
        ValidationError: {
          description:
            "The request data is invalid.",

          content: {
            "application/json": {
              schema: {
                $ref:
                  "#/components/schemas/ApiError",
              },
            },
          },
        },

        Unauthorized: {
          description:
            "Authentication is missing or invalid.",

          content: {
            "application/json": {
              schema: {
                $ref:
                  "#/components/schemas/ApiError",
              },
            },
          },
        },

        NotFound: {
          description:
            "The requested blog post was not found.",

          content: {
            "application/json": {
              schema: {
                $ref:
                  "#/components/schemas/ApiError",
              },
            },
          },
        },

        Conflict: {
          description:
            "The requested operation conflicts with the current article state or slug.",

          content: {
            "application/json": {
              schema: {
                $ref:
                  "#/components/schemas/ApiError",
              },
            },
          },
        },

        InternalError: {
          description:
            "Unexpected server error.",

          content: {
            "application/json": {
              schema: {
                $ref:
                  "#/components/schemas/ApiError",
              },
            },
          },
        },
      },
    },
  };

  return NextResponse.json(
    schema,
    {
      headers: {
        "Cache-Control":
          "public, max-age=300, stale-while-revalidate=600",
      },
    },
  );
}
