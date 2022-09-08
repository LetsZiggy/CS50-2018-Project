import * as path from "node:path"
import { CLIOptions } from "aurelia-cli"
import * as gulp from "gulp"
import { Server as Karma } from "karma"
import build from "./build"
import watch from "./watch"

const karma = (done) => {
	new Karma(
		{
			configFile: path.join(__dirname, "/../../karma.conf.js"),
			singleRun: !CLIOptions.hasFlag("watch"),
		},
		(error) => {
			done()
			if (error) { process.exit(error) }
		},
	)
	.start()
}

const unit = CLIOptions.hasFlag("watch")
	? gulp.series(
		build,
		gulp.parallel(
			(done) => {
				watch()
				done()
			},
			karma,
		),
	)
	: gulp.series(
		build,
		karma,
	)

export { unit as default }
