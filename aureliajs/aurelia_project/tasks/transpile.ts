import * as fs from "node:fs"
import { Transform } from "node:stream"
import { CLIOptions, Configuration, build } from "aurelia-cli"
import * as gulp from "gulp"
import * as gulpIf from "gulp-if"
import * as plumber from "gulp-plumber"
import * as rename from "gulp-rename"
import * as swc from "gulp-swc"
import * as ts from "gulp-typescript"
import * as tsconfig from "../../tsconfig.json"
import * as project from "../aurelia.json"

tsconfig.compilerOptions.paths = Object.fromEntries(Object
	.entries(tsconfig.compilerOptions.paths)
	.map(([ key, value ]) => [ key.endsWith("/*") ? key.slice(0, -2) : key, value ]))

function configureEnvironment () {
	const environment = CLIOptions.getEnvironment()

	return gulp
		.src(`aurelia_project/environments/${ environment }.ts`, {
			since: gulp.lastRun(configureEnvironment),
		})
		.pipe(rename("environment.ts"))
		.pipe(new Transform({
			objectMode: true,
			transform: function (file, _, callback) {
				// https://github.com/aurelia/cli/issues/1031
				fs.unlink(`${ project.paths.root }/${ file.relative }`, function () {
					callback(null, file)
				})
			},
		}))
		.pipe(gulp.dest(project.paths.root))
}

function buildTypeScript () {
	const typescriptCompiler = ts.createProject("tsconfig.json", {
		typescript: require("typescript"),
		noEmitOnError: true,
	})

	const swcConfig = {
		minify: CLIOptions.getEnvironment() === "prod",
		jsc: {
			parser: {
				syntax: "typescript",
				tsx: false,
				decorators: true,
				dynamicImport: true,
			},
			transform: {
				legacyDecorator: tsconfig.compilerOptions.experimentalDecorators,
				decoratorMetadata: tsconfig.compilerOptions.emitDecoratorMetadata,
				optimizer: (CLIOptions.getEnvironment() === "prod")
					? { simplify: true, jsonify: { minCost: 1024 } }
					: undefined,
			},
			externalHelpers: true,
			target: tsconfig.compilerOptions.target,
			loose: false,
			keepClassNames: true,
			paths: tsconfig.compilerOptions.paths,
			baseUrl: tsconfig.compilerOptions.baseUrl,
			minify: {
				compress: CLIOptions.getEnvironment() === "prod",
				mangle: CLIOptions.getEnvironment() === "prod",
			},
		},
		module: {
			type: "es6",
			strict: true,
			strictMode: true,
			lazy: false,
			noInterop: false,
		},
		sourceMaps: true,
		inlineSourcesContent: false,
	}

	return gulp
		.src(project.transpiler.dtsSource)
		.pipe(gulp.src(project.transpiler.source, {
			sourcemaps: true,
			since: gulp.lastRun(buildTypeScript),
		}))
		.pipe(gulpIf(CLIOptions.hasFlag("watch"), plumber()))
		// .pipe(gulpIf(CLIOptions.taskName() === "test", typescriptCompiler(), swc(swcConfig)))
		// .pipe(typescriptCompiler())
		.pipe(swc(swcConfig))
		.pipe(build.bundle())
}

export default gulp.series(
	configureEnvironment,
	buildTypeScript,
)
