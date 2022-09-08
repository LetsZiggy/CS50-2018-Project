import { CLIOptions, build } from "aurelia-cli"
import * as autoprefixer from "autoprefixer"
import * as cssnano from "cssnano"
import * as gulp from "gulp"
import * as postcss from "gulp-postcss"
import * as postcssUrl from "postcss-url"
import * as tailwindConfig from "../../tailwind.config"
import * as project from "../aurelia.json"

export default function processCSS () {
	return gulp
		.src(project.cssProcessor.source, {
			sourcemaps: true,
			// https://github.com/aurelia/cli/commit/1d61223317c61dbd2c6ae4e25b224a29913910ba#diff-ffb3de8cc7411cd5c873aaef9a662de9
			since: gulp.lastRun(processCSS),
		})
		.pipe(postcss([
			require("tailwindcss")(tailwindConfig),
			autoprefixer(),
			// Inline images and fonts
			postcssUrl({ url: "inline", encodeType: "base64" }),
			cssnano(),
		]))
		.pipe(build.bundle()) // To bundle in app-bundle.js
		// .pipe(gulp.dest(project.cssProcessor.output)) // To create separate css files
}
