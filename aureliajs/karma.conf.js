const path = require("node:path")
const project = require("./aurelia_project/aurelia.json")
const tsconfig = require("./test/tsconfig.json")
const karmaConfig = project.unitTestRunner

const testSource = [
	{ pattern: karmaConfig.source, included: false },
	"./test/aurelia-karma.js",
]

const output = project.platform.output
const appSource = project.build.bundles.map((x) => path.join(output, x.name))
const entryIndex = appSource.indexOf(path.join(output, project.build.loader.configTarget))
const entryBundle = appSource.splice(entryIndex, 1)[0]
const sourceMaps = [{ pattern: "scripts/**/*.js.map", included: false }]
const files = [ ...[ entryBundle ].concat(testSource).concat(appSource), ...sourceMaps ]

const compilerOptions = tsconfig.compilerOptions
compilerOptions.inlineSourceMap = true
compilerOptions.inlineSources = true
compilerOptions.module = "amd"

module.exports = function (config) {
	config.set({
		basePath: "",
		frameworks: [ project.testFramework.id ],
		files,
		exclude: [],
		preprocessors: {
			[karmaConfig.source]: [ project.transpiler.id ],
			[appSource]: [ "sourcemap" ],
		},
		typescriptPreprocessor: {
			typescript: require("typescript"),
			options: compilerOptions,
		},
		reporters: [ "progress" ],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		// Make Karma work with pnpm.
		// See: https://github.com/pnpm/pnpm/issues/720#issuecomment-954120387
		plugins: Object.keys(require("./package.json").devDependencies).flatMap(
			(packageName) => {
				if (!packageName.startsWith("karma-")) return []
				return [ require(packageName) ]
			},
		),

		// Start these browsers
		// Available browser launchers: https://npmjs.org/browse/keyword/karma-launcher

		// (eg) To run in non-headless mode:
		// 1. Comment "Chromium"
		// 2. Uncomment "ChromiumHeadless"
		browsers: [
			// "Chromium",
			// "Firefox",
			"ChromiumHeadless",
			// "FirefoxHeadless",
		],
		customLaunchers: {
			// https://github.com/karma-runner/karma-chrome-launcher
			ChromeHeadless: {
				base: "Chromium",
				flags: [
					"--no-sandbox",
					"--headless",
					"--disable-gpu",
					"--remote-debugging-port=9222",
				],
			},

			// https://github.com/karma-runner/karma-firefox-launcher
			// FirefoxHeadless: {
			// 	base: "Firefox",
			// 	flags: [
			// 		"-headless",
			// 	],
			// 	prefs: {
			// 		"media.navigator.permission.disabled": true,
			// 	},
			// },
		},

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true,

		// client.args must be a array of string.
		// Leave "aurelia-root", project.paths.root in this order so we can find
		// the root of the aurelia project.
		client: {
			args: [ "aurelia-root", project.paths.root ],
		},
	})
}
