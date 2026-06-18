import quotes from './quotes.json';

export const generateWinningQuote = (): string => {
	const winningQuotes = quotes.winningQuotes;
	return winningQuotes[Math.floor(Math.random() * winningQuotes.length)];
};

export const generateLosingQuote = (): string => {
	const losingQuotes = quotes.losingQuotes;
	return losingQuotes[Math.floor(Math.random() * losingQuotes.length)];
};
