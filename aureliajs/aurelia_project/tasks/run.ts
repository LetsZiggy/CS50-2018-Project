import { CLIOptions } from "aurelia-cli"
import * as gulp from "gulp"
import * as project from "../aurelia.json"
import build from "./build"
import * as developmentServer from "./dev-server"
import watch from "./watch"

if (!CLIOptions.hasFlag("watch")) {
	// "au run" always runs in watch mode
	CLIOptions.instance.args.push("--watch")
}

const serve = gulp.series(
	build,
	function startDevelopmentServer (done) {
		developmentServer.run({
			open: CLIOptions.hasFlag("open") || project.platform.open,
			port: CLIOptions.getFlagValue("port") || project.platform.port,
			host: CLIOptions.getFlagValue("host") || project.platform.host || "localhost",
			baseDir: project.platform.baseDir,
		})
		done()
	},
)

function log (message) {
	console.log(message) // eslint-disable-line no-console
}

function reload () {
	log("Refreshing the browser")
	developmentServer.reload()
}

const run = gulp.series(
	serve,
	(done) => {
		watch(reload)
		done()
	},
)

const shutdownDevelopmentServer = () => {
	developmentServer.destroy()
}

export { run as default, serve, shutdownDevelopmentServer as shutdownDevServer }
