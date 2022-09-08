import { nextStateHistory } from "aurelia-store"
// import { set } from "lodash-es"
import type { StateHistory } from "aurelia-store"
import type { State } from "states/state"

export interface AppActions {
	action: (state: StateHistory<State>, data: any) => StateHistory<State>,
}

export const appActions: AppActions = {
	action: (state, data) => {
		return nextStateHistory(state, {
			...state.present,
		})
	},
}
