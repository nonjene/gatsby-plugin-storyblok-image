module.exports = {
	collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
	resolver: 'jest-pnp-resolver',
	modulePaths: ['<rootDir>/src/'],
	testMatch: ['<rootDir>/src/**/__tests__/**/?(*.)spec.{js,ts}'],
	transform: {
		'^.+\\.(js|ts)$': '<rootDir>/node_modules/babel-jest',
	},
	transformIgnorePatterns: [
		'[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
	],

	moduleFileExtensions: ['js', 'ts', 'json'],
};
