import "dotenv/config";
import { PrismaClient } from "./generated/prisma/client.ts";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

// usa o adapter do Prisma para o SQLite
const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL ?? "file:./dev.db",
});

export const db = new PrismaClient({ adapter });
