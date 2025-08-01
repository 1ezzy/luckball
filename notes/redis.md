copilot's recommended Redis structure:

1. User Data (per week)

```
// Key: `{seasonType}:week:{weekNumber}:users`
// Value: Hash with user IDs as fields
{
  "user123": JSON.stringify({
    displayName: "John",
    joinedAt: "2024-01-15T10:30:00Z",
    teamAssignment: null // assigned when round starts
  })
}
```

2. Team Data (per week)

```
// Key: `{seasonType}:week:{weekNumber}:teams`
// Value: Hash with team names as fields
{
  "RedThunder": JSON.stringify({
    players: ["user123", "user456"],
    nflTeams: ["KC", "BUF", "MIA", ...], // assigned NFL teams
    totalScore: 0,
    wins: 0
  }),
  "BlueStorm": JSON.stringify({
    players: ["user789", "user101"],
    nflTeams: ["NE", "NYJ", "BAL", ...],
    totalScore: 0,
    wins: 0
  })
}
```

3. Round Status

```
// Key: `{seasonType}:week:{weekNumber}:status`
// Value: String or JSON
{
  status: "joining|started|completed",
  startTime: "2024-01-15T13:00:00Z",
  endTime: null
}
```
