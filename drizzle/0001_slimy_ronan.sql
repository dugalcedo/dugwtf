CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"displayName" varchar(31) NOT NULL,
	"email" varchar(255) NOT NULL,
	"hash" text NOT NULL,
	"role" varchar(15),
	CONSTRAINT "users_displayName_unique" UNIQUE("displayName"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
