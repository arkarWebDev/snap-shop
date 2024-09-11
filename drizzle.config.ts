import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

export default defineConfig({
  dialect: "postgresql",
  schema: "./server/schema.ts",
  out: "./server/migration",
  dbCredentials: {
    url: process.env.DRIZZLE_DATABASE_URL!,
  },
});
