import { 
    pgTable,
    integer,
    varchar,
    text,
} from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    displayName: varchar({ length: 31 }).notNull().unique(),
    email: varchar({ length: 255 }).notNull().unique(),
    hash: text().notNull(),
    role: varchar({ length: 15 })
})

export type DbUser = typeof userTable.$inferSelect;