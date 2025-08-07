import { pgTable, uuid, varchar, integer } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const users = pgTable('users', {
	id: uuid().primaryKey().notNull(),
	displayName: varchar('display_name'),
	wins: integer().default(0),
	losses: integer().default(0),
	winStreak: integer('win_streak').default(0),
	bestTeamName: varchar('best_team_name'),
	bestTeamScore: integer('best_team_score').default(0)
});
