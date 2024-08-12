CREATE TABLE IF NOT EXISTS "meals" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"date_time" timestamp NOT NULL,
	"user_id" uuid NOT NULL
);
