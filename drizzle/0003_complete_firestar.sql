ALTER TABLE "users" ALTER COLUMN "verificationCode" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_verificationCode_unique" UNIQUE("verificationCode");