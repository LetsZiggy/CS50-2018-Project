import 'whatwg-fetch'

import environment from './environment'
import { initialState } from './state'

export function configure (aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(`resources`)

  if (environment.debug) {
    aurelia.use.developmentLogging()
  }

  if (environment.testing) {
    aurelia.use.plugin(`aurelia-testing`)
  }

  aurelia.use
    .plugin(`aurelia-store`, {
      initialState,
      history: {
        undoable: true,
        limit: 10,
      },
    })

  return aurelia.start().then(() => aurelia.setRoot())
}
