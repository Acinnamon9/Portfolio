import {
  neonConfig,
  Pool,
} from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";

import * as schema from "./schema";

const connectionString =
  process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not configured.",
  );
}

/**
 * Node.js does not provide the WebSocket implementation expected by
 * the Neon serverless driver in every runtime, so we supply `ws`.
 *
 * WebSocket mode is required for interactive transactions such as:
 *
 * db.transaction(async (tx) => {
 *   // multiple dependent queries
 * });
 */
neonConfig.webSocketConstructor = ws;

/**
 * Neon Pool provides a session-capable connection.
 *
 * This is different from the previous `neon()` HTTP client, which
 * supported individual queries but not Drizzle's interactive
 * transaction callback.
 */
const pool = new Pool({
  connectionString,
});

/**
 * Pass the schema so relational types and schema-aware queries remain
 * available.
 */
export const db = drizzle(pool, {
  schema,
});
