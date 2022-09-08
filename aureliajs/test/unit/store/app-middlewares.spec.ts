import { initialState } from "states/state"
// import { appMiddlewares } from "store/app-middlewares"
// import { sleep } from "test/unit/test-utility"
import type { StateHistory } from "aurelia-store"
import type { State } from "states/state"
// import type { AppMiddlewares } from "store/app-middlewares"

xdescribe("Store Middlewares: appMiddlewares", () => {
	let state: StateHistory<State>

	beforeEach((done) => {
		state = {
			past: [],
			present: {
				...initialState,
			},
			future: [],
		}

		done()
	})

	afterEach((done) => {
		done()
	})

	it("TODO", function () { pending("TODO") })

	xdescribe("[middlewareName]", () => {
		xit("should ...", (done) => {
			done()
		})
	})
})

// https://discourse.aurelia.io/t/solved-testing-action-dispatch/2860
// https://discourse.aurelia.io/t/unit-testing-a-class-that-requires-dependencies/1217/2
