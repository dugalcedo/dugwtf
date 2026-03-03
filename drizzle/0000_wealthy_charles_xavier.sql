CREATE TABLE "things" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "things_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"value" text NOT NULL,
	"color" varchar(32) NOT NULL
);
