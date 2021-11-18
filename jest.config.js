// https://github.com/angular/angular/issues/43833#issuecomment-968916819
// For Angular 13 support, we're installing jest-preset-angular@^11.0.0-rc.3

module.exports = {
	preset: 'jest-preset-angular',
	testMatch: ['**/+(*.)+(spec).+(ts)'],
	setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
	collectCoverage: true,
	coverageReporters: ['html'],
	coverageDirectory: 'coverage/unit-tests-demo',
};
