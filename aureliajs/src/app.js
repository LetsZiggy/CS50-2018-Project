import { connectTo } from 'aurelia-store'
import { pluck, distinctUntilChanged } from 'rxjs/operators'

// https://rxjs-dev.firebaseapp.com/api/operators/pluck
// https://www.learnrxjs.io/operators/transformation/pluck.html
@connectTo({
  setup: `bind`,
  teardown: `unbind`,
  target: `state`,
  selector: {
    username: (store) => store.state.pipe(
      pluck(`present`, `username`),
      distinctUntilChanged()
    ),
  },
})
export class App {
  configureRouter (config, router) {
    this.router = router
    config.title = `CS50 2018 Project`

    config.map([
      {
        route: ``,
        redirect: `entrance`,
      },
      {
        route: `entrance`,
        name: `entrance`,
        moduleId: `./modules/entrance`,
        title: `Entrance`,
        nav: 2,
      },
      {
        route: `lobby/:username`,
        name: `lobby`,
        moduleId: `./modules/lobby`,
        title: `Lobby`,
        nav: 1,
        href: `#/lobby`,
      },
      {
        route: `table/:assetid`,
        name: `table`,
        moduleId: `./modules/table`,
        title: `Table`,
        nav: false,
        href: `#/table`,
      },
      {
        route: `character/:assetid`,
        name: `character`,
        moduleId: `./modules/character`,
        title: `Character`,
        nav: false,
        href: `#/character`,
      },
      {
        route: `monster/:assetid`,
        name: `monster`,
        moduleId: `./modules/monster`,
        title: `Monster`,
        nav: false,
        href: `#/monster`,
      },
    ])

    config.mapUnknownRoutes({ redirect: `entrance` })
  }
}
