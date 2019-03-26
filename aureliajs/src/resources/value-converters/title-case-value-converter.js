export class TitleCaseValueConverter {
  toView (value) {
    return value.toLowerCase().replace(/(^[a-z]| [a-z])/g, match => match.toUpperCase())
  }
}
