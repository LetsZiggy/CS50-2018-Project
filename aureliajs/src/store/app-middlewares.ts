// import { set } from "lodash-es"
import type { CallingAction, StateHistory } from "aurelia-store"
import type { State } from "states/state"

export interface AppMiddlewares {
	middleware: (currentState: StateHistory<State>, originalState: StateHistory<State> | undefined, settings: Record<string, unknown>, action: CallingAction) => StateHistory<State> | void, // eslint-disable-line @typescript-eslint/no-invalid-void-type
}

export const appMiddlewares: AppMiddlewares = {
	middleware: (currentState, originalState, settings, action) => {},
}
