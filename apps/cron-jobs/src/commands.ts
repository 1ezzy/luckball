import { Command } from 'commander';
import { CronJobRunner } from './index';

const program = new Command();
const runner = new CronJobRunner(process.env);

program
	.command('begin-week')
	.description('Trigger beginWeek cron job')
	.action(async () => {
		const result = await runner.handleBeginWeek();
		console.log(result);
		process.exit(0);
	});

program
	.command('start-active-week')
	.description('Trigger startActiveWeek cron job')
	.action(async () => {
		const result = await runner.handleStartActiveWeek();
		console.log(result);
		process.exit(0);
	});

program
	.command('end-week')
	.description('Trigger endWeek cron job')
	.action(async () => {
		const result = await runner.handleEndWeek();
		console.log(result);
		process.exit(0);
	});

program
	.command('update-scores')
	.description('Trigger updateScores cron job')
	.action(async () => {
		await runner.updateScores();
		process.exit(0);
	});

program.parseAsync(process.argv);
