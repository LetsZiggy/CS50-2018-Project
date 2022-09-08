import { initialState } from "states/state"
// import { appActions } from "store/app-actions"
// import { sleep } from "test/unit/test-utility"
import type { StateHistory } from "aurelia-store"
import type { State } from "states/state"
// import type { AppActions } from "store/app-actions"

xdescribe("Store Actions: appActions", () => {
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

	xdescribe("[actionName]", () => {
		xit("should ...", (done) => {
			done()
		})
	})
})

// https://discourse.aurelia.io/t/solved-testing-action-dispatch/2860
// https://discourse.aurelia.io/t/unit-testing-a-class-that-requires-dependencies/1217/2
