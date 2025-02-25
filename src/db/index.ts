import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

if (process.env.NODE_ENV === "development") {
  config({ path: ".env.local" });
}

const sql = neon(process.env.DATABASE_URL!);

// Logger
// const db = drizzle(sql, { logger: true });

const db = drizzle(sql);

export { db };
