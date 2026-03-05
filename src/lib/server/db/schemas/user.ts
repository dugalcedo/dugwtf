import { 
    pgTable,
    integer,
    varchar,
    text,
    boolean,
    timestamp
} from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    displayName: varchar({ length: 31 }).notNull().unique(),
    email: varchar({ length: 255 }).notNull().unique(),
    hash: text().notNull(),
    role: varchar({ length: 15 }),
    verificationCode: text().notNull().unique(),
    verified: boolean().notNull().default(false),
    lastVerificationCodeSentAt: timestamp({ mode: "date" })
})

export type DbUser = typeof userTable.$inferSelect;