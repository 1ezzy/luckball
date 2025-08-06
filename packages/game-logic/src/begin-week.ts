import { espnApi } from "./utils/espn-api";


export const beginWeek = async(seasonType: string, weekNumber: number, redis: any, drizzle: any) => {
    const weekDataKey = `${seasonType}:week:${weekNumber}:data`;

    // get all matchups for the week
    const weekEvents = await espnApi.getWeekEvents(seasonType, weekNumber);
    const matchups = weekEvents.events.map((event: any) => event.shortName)[0];
    if (matchups.length === 0) {
        return { success: false, message: 'No NFL matchups found for the week.' };
    }

    // update redis with new match data
    await redis.del(`${seasonType}:week:${weekNumber}:matchups`);
    await redis.lpush(`${seasonType}:week:${weekNumber}:matchups`, JSON.stringify(matchups));

    // get the previous week data
    const prevWeekData = await redis.get(weekDataKey);

    // create current week data
    const weekData = {
        lastWinningTeam: prevWeekData?.winningTeam ?? '',
        status: "pending"
    };

    // save the results
    await redis.set(weekDataKey, JSON.stringify(weekData));

    return { success: true, message: `Week ${weekNumber} started ended.` };
}
