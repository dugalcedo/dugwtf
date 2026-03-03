import { 
    pgTable,
    integer,
    text,
    varchar
} from "drizzle-orm/pg-core";

export const thingTable = pgTable("things", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    value: text().notNull(),
    color: varchar({ length: 32 }).notNull()
})