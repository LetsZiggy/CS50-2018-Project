const path = require("node:path")
const rootSettings = require("../.eslintrc")

module.exports = {
	...rootSettings,
	"extends": [
		...rootSettings.extends,
		"plugin:playwright/playwright-test",
	],
	"plugins": [
		...rootSettings.plugins,
		"playwright",
	],
	"env": {
		...rootSettings.env,
		"shared-node-browser": true,
	},
	/*
	"settings": {
		...rootSettings.settings,
		"import/resolver": {
			...rootSettings.settings["import/resolver"],
			typescript: {
				...rootSettings.settings["import/resolver"].typescript,
				project: [
					path.join(__dirname, "tsconfig.json"),
					path.join(__dirname, "..", "tsconfig.json"),
				],
			},
		},
	},
	*/
	"overrides": [
		{
			files: [ "*.ts" ],
			parserOptions: {
				...rootSettings.overrides[0].parserOptions,
				project: [
					path.join(__dirname, "tsconfig.json"),
					path.join(__dirname, "..", "tsconfig.json"),
				],
				tsconfigRootDir: __dirname,
			},
		},
	],
}
