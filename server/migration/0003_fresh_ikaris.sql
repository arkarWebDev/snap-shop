CREATE TABLE IF NOT EXISTS "reset_password_token" (
	"id" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "reset_password_token_id_token_pk" PRIMARY KEY("id","token")
);
