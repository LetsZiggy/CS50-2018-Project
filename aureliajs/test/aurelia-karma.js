(function (global) {
	const karma = global.__karma__
	const requirejs = global.requirejs
	const locationPathname = global.location.pathname
	let root = "src"
	for (const [ index, value ] of karma.config.args.entries()) {
		if (value === "aurelia-root") {
			root = karma.config.args[index + 1]
		}
	}

	if (!karma || !requirejs) {
		return
	}

	function normalizePath (path) {
		const normalized = []
		const parts = path
			.split("?")[0] // cut off GET params, used by noext requirejs plugin
			.split("/")

		for (const part of parts) {
			if (part === ".") {
				continue
			}

			if (part === ".." && normalized.length > 0 && normalized.at(-1) !== "..") {
				normalized.pop()
				continue
			}

			normalized.push(part)
		}

		// Use case of testing source code. RequireJS doesn't add .js extension to files asked via sibling selector
		// If normalized path doesn't include some type of extension, add the .js to it
		if (normalized.length > 0 && !normalized.at(-1).includes(".")) {
			normalized[normalized.length - 1] = normalized.at(-1) + ".js"
		}

		return normalized.join("/")
	}

	function patchRequireJS (files, originalLoadFunction, locationPathname) {
		const IS_DEBUG = /debug\.html$/.test(locationPathname)

		const origNameToUrl = requirejs.nameToUrl
		requirejs.nameToUrl = function karmaNameToUrl (moduleName) {
			let url = origNameToUrl(moduleName)
			// Map paths to karma server
			if (url.indexOf("/base") !== 0) {
				url = `/base/${ url }`
			}
			// Prevent caching by appending file hash as query
			if (files.hasOwnProperty(url) && !IS_DEBUG) {
				url = `${ url }?${ files[url] }`
			}
			return url
		}

		const originalDefine = global.define
		global.define = function (name, deps, m) {
			if (typeof name === "string") {
				// alias from module "/base/root/name" to module "name"
				originalDefine("/base/" + root + "/" + name, [ name ], function (result) { return result })
			}

			// normal module define("name")
			return originalDefine(name, deps, m)
		}
		global.define.amd = originalDefine.amd
	}

	function requireTests () {
		const TEST_REGEXP = /(spec)\.js$/i
		const allTestFiles = []

		for (const file of Object.keys(window.__karma__.files)) {
			if (TEST_REGEXP.test(file)) {
				allTestFiles.push(file)
			}
		}

		require([ "/base/test/unit/setup.js" ], function () {
			require(allTestFiles, window.__karma__.start)
		})
	}

	karma.loaded = function () {} // make it async
	patchRequireJS(karma.files, requirejs.load, locationPathname)
	requireTests()
})(window)
