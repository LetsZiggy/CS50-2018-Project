import { build } from "aurelia-cli"
import * as gulp from "gulp"
import * as project from "../aurelia.json"

export default function processJson () {
	return gulp
		.src(project.jsonProcessor.source, {
			since: gulp.lastRun(processJson),
		})
		.pipe(build.bundle())
}
