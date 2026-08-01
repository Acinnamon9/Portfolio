import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";

config({
  path: [".env.local", ".env"],
});

const databaseUrl =
  process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is missing.");
}

const sql = neon(databaseUrl);

const rows = await sql`
  select
    table_name
  from information_schema.tables
  where table_schema = 'public'
    and table_name like 'blog_%'
  order by table_name;
`;

console.log(rows);
