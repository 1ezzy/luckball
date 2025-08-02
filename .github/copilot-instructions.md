# Tech Stack/Technologies

This project is a SvelteKit project which uses some of the following technologies:

1. Svelte and SvelteKit
2. svelte-ux
3. TypeScript
4. Redis (via Upstash)

This project is hosted via a Cloudflare Worker and uses the custom domain luckball.ezzy.dog

# Project Description

This project is a web application based off the NFL season schedule. Here are some details about the application:

- Users can join a "round" once every week of the NFL schedule, and once the first game of the week starts, the round starts and users are randomly assigned to one of two teams.
- Each team is given a randomly generated name comprised of two random words and each team is of equal size (one team can have one extra if the number of users in the given round is odd).
- The application will take one team from each matchup in the week's game schedule and randomly assign that team to one of the two teams. This will leave each team in the round with 16 NFL teams who are matched up against the other teams 16 NFL teams.
- When the week's game schedule reaches an end (all games for the week have been played), whichever team has more winning teams wins, and all of the players on that team win. Tiebreakers are decided by which team has a higher sum of their NFL team's scores for the week.
- When a user wins, a win is added to their browsers local storage so the user can see how many times they have won. The local storage will also hold the name of the users highest scoring team of all time.
