copilot's recommended Redis structure:

1. User Data (per week)

```
// Key: `{seasonType}:week:{weekNumber}:users`
"user123": {
  displayName: "John",
  joinedAt: "2024-01-15T10:30:00Z",
  teamAssignment: null /* assigned when round starts */
}
```

2. Week data (per week)

```
// Key: `{seasonType}:week:${weekNumber}:data`
{
  team1: {
    name: team1Name,
    players: team1Players,
    nflTeams: team1NflTeams,
    totalScore: 0,
    wins: 0
  },
  team2: {
    name: team1Name,
    players: team2Players,
    nflTeams: team2NflTeams,
    totalScore: 0,
    wins: 0
  },
  status: 'IN_PROGRESS'
};
```

3. Matchups (for week)

```
// Key: `{seasonType}:week:{weekNumber}:matchups`
["TEAM1 VS TEAM2", "TEAM3 VS TEAM4"];
```
