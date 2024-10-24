CREATE TABLE IF NOT EXISTS "user" (
	"id" serial NOT NULL,
	"name" text,
	"email" text,
	"password" text,
	"role" text,
	"create_at" timestamp,
	"update_at" timestamp
);
