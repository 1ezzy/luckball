import { includeIgnoreFile } from '@eslint/compat';
import svelte from 'eslint-plugin-svelte';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';
import { baseConfig } from '../../eslint.config.js';
import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default ts.config(
	...baseConfig,
	includeIgnoreFile(gitignorePath),
	...svelte.configs.recommended,
	...svelte.configs.prettier,
	{
		rules: {
			// Additional frontend-specific rules
			'@typescript-eslint/no-explicit-any': 'warn'
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				svelteConfig
			}
		}
	}
);
