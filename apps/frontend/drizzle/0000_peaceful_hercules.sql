-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"display_name" varchar,
	"wins" integer DEFAULT 0,
	"losses" integer DEFAULT 0,
	"win_streak" integer DEFAULT 0,
	"best_team_name" varchar,
	"best_team_score" integer DEFAULT 0
);

*/