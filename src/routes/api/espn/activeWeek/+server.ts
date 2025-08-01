import { json } from '@sveltejs/kit';

export async function GET() {
	const currentYear = new Date().getFullYear();
	const espnRes = await fetch(
		`https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard`
	);
	const espnData = await espnRes.json();

	// Extract current week from ESPN data
	const currentWeek = espnData.week?.number || 1;
	const seasonType = espnData.season?.type || 2;

	return json({ currentWeek: currentWeek, seasonType: seasonType });
}
