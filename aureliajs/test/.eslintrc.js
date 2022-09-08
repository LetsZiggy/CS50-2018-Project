const path = require("node:path")
const rootSettings = require("../.eslintrc")

module.exports = {
	...rootSettings,
	"extends": [
		...rootSettings.extends,
		"plugin:jasmine/recommended",
	],
	"plugins": [
		...rootSettings.plugins,
		"jasmine",
	],
	"env": {
		...rootSettings.env,
		jasmine: true,
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
