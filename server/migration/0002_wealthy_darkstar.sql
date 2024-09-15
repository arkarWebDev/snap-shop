CREATE TABLE IF NOT EXISTS "email_verification_token" (
	"id" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "email_verification_token_id_token_pk" PRIMARY KEY("id","token")
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "password" text;