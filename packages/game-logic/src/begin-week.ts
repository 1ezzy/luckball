import { espnApi } from "./api/espn-api";

export const beginWeek = async(redis: any, drizzle: any) => {
    const { currentWeek, seasonType } = await espnApi.getActiveWeek();
    const weekDataKey = `${seasonType.type}:week:${currentWeek}:data`;

    // get all matchups for the week
    const weekEvents = await espnApi.getWeekEvents(seasonType.type, currentWeek);
    const matchups = weekEvents.events.map((event: any) => event.shortName)[0];
    if (matchups.length === 0) {
        return { success: false, message: 'No NFL matchups found for the week.' };
    }

    // update redis with new match data
    await redis.del(`${seasonType.type}:week:${currentWeek}:matchups`);
    await redis.lpush(`${seasonType.type}:week:${currentWeek}:matchups`, JSON.stringify(matchups));

    // get the previous week data
    const prevWeekData = await redis.get(weekDataKey);

    // create current week data
    const weekData = {
        lastWinningTeam: prevWeekData?.winningTeam ?? '',
        status: "pending"
    };

    // save the results
    await redis.set(weekDataKey, JSON.stringify(weekData));

    return { success: true, message: `Week ${currentWeek} started ended.` };
}
