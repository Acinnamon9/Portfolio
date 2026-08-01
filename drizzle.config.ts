import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({
  path: [".env.local", ".env"],
});

const databaseUrl =
  process.env.DATABASE_URL_UNPOOLED ??
  process.env.POSTGRES_URL_NON_POOLING ??
  process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "No database URL is available for Drizzle migrations.",
  );
}

export default defineConfig({
  schema: "./lib/db/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",

  dbCredentials: {
    url: databaseUrl,
  },

  migrations: {
    table: "__drizzle_migrations",
    schema: "drizzle",
  },

  strict: true,
  verbose: true,
});
