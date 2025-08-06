

export const endWeek = async(seasonType: string, weekNumber: number, redis: any, drizzle: any) => {
    const usersKey = `${seasonType}:week:${weekNumber}:users`;
    const weekDataKey = `${seasonType}:week:${weekNumber}:data`;
    const matchupsKey = `${seasonType}:week:${weekNumber}:matchups`;

    // get a list of all the users
    const users = await redis.hgetall(usersKey);
    if (!users || Object.keys(users).length === 0) {
        return { success: false, message: 'No users to start the week.' };
    }

    // get a list of all the matchups
    const matchups = await redis.lrange(matchupsKey, 0, -1);
    if (matchups.length === 0) {
        return { success: false, message: 'No NFL matchups found for the week.' };
    }

    // get the week data
    const weekData = await redis.get(weekDataKey);
    if (weekData.length === 0) {
        return { success: false, message: 'No week data found.' };
    }

    // get relevant team data for new object
    const team1Name = weekData.team1.name;
    const team2Name = weekData.team2.name;
    const team1Players = weekData.team1.players;
    const team2Players = weekData.team2.players;

    // determine the win status for both teams
    let team1WinStatus, team2WinStatus, winningTeam;
    const team1Score = weekData.team1.totalScore;
    const team2Score = weekData.team2.totalScore;
    if (team1Score > team2Score) {
        team1WinStatus = true;
        team2WinStatus = false;
        winningTeam = team1Name;
    } else {
        team1WinStatus = false;
        team2WinStatus = true;
        winningTeam = team2Name;
    }

    // update the user week to the end status
    const updatedWeekData = {
        team1: {
            name: team1Name,
            totalScore: team1Score,
            players: team1Players,
            winStatus: team1WinStatus,
        },
        team2: {
            name: team2Name,
            totalScore: team2Score,
            players: team2Players,
            winStatus: team2WinStatus,
        },
        status: 'ended',
        winningTeam: winningTeam
    };

    // save the results
    await redis.set(weekDataKey, JSON.stringify(updatedWeekData));

    return { success: true, message: `Week ${weekNumber} started ended.` };
}
