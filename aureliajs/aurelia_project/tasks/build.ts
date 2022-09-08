import { CLIOptions, build as buildCLI } from "aurelia-cli"
import * as del from "del"
import * as gulp from "gulp"
import * as project from "../aurelia.json"
import copyFiles from "./copy-files"
import processCSS from "./process-css"
import processJson from "./process-json"
import processMarkup from "./process-markup"
import transpile from "./transpile"
import watch from "./watch"

function clean () {
	return del(project.platform.output)
}

const build = gulp.series(
	readProjectConfiguration,
	gulp.parallel(
		transpile,
		// https://github.com/lazymozek/gulp-with-tailwindcss/blob/master/gulpfile.js
		gulp.series(processCSS, processMarkup),
		processCSS,
		processJson,
		copyFiles,
	),
	writeBundles,
)

const main = (CLIOptions.taskName() === "build" && CLIOptions.hasFlag("watch"))
	? gulp.series(
		clean,
		build,
		(done) => {
			watch()
			done()
		},
	)
	: gulp.series(
		clean,
		build,
	)

function readProjectConfiguration () {
	return buildCLI.src(project)
}

function writeBundles () {
	return buildCLI.dest()
}

export { main as default }
