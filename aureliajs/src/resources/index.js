export function configure (config) {
  config.globalResources([
    `./value-converters/title-case-value-converter`,
    `./value-converters/slice-value-converter`,
    `./elements/nav-header.html`,
    `./elements/nav-footer.html`,
    `./elements/macro-modal`,
  ])
}
