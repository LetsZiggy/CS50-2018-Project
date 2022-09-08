import { validateTrigger } from "aurelia-validation"
import { initialState } from "states/state"
import environment from "./environment"
import type { Aurelia } from "aurelia-framework"
import type { GlobalValidationConfiguration } from "aurelia-validation"

export function configure (aurelia: Aurelia): void {
	aurelia.use
		.standardConfiguration()
		.developmentLogging(environment.debug ? "debug" : "warn")
		.feature("resources")
		// If using aurelia-deep-computed (https://github.com/bigopon/aurelia-deep-computed#readme)
		.plugin("aurelia-deep-computed")
		// If using state-management (http://aurelia.io/docs/plugins/store)
		.plugin("aurelia-store", {
			initialState,
			// measurePerformance: "all",
			// logDispatchedActions: true,
			// logDefinitions: {
			// 	dispatchedActions: "debug",
			// 	performanceLog: "debug",
			// },
			propagateError: true,
			history: {
				undoable: true,
				limit: 10,
			},
		})
		// If using user input validation (http://aurelia.io/docs/plugins/validation)
		.plugin("aurelia-validation", (config: GlobalValidationConfiguration) => {
			config.defaultValidationTrigger(validateTrigger.change)
		})
		// If using 1st-party localisation and internationalisation library (http://aurelia.io/docs/plugins/i18n)
		// .plugin("aurelia-i18n", (instance) => { /* PLACEHOLDER */ })
		// If using 1st-party modal library (http://aurelia.io/docs/plugins/dialog)
		// .plugin("aurelia-dialog", (config) => {
		// 	config.useResource("attach-focus")
		// 	/* PLACEHOLDER */
		// })
		// If using 1st-party animation library (http://aurelia.io/docs/plugins/animation)
		// If enabled, add swap-order="after" to all router-view elements
		// .plugin("aurelia-animator-css")
		// If using 1st-party UI virtualization library (http://aurelia.io/docs/plugins/virtualization)
		// .plugin("aurelia-ui-virtualization")
		// If using HTMLImports, 3rd-party UI/UX library, to load views (http://aurelia.io/docs/integration/polymer)
		// .plugin("aurelia-html-import-template-loader")

	if (environment.testing) {
		aurelia.use
			.plugin("aurelia-testing")
	}

	aurelia
		.start()
		.then(() => aurelia.setRoot()) // eslint-disable-line @typescript-eslint/promise-function-async
}
