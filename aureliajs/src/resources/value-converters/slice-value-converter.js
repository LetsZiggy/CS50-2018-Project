export class SliceValueConverter {
  toView (array, begin = null, end = null) {
    begin = (Number.isInteger(begin))
      ? begin
      : Math.ceil(array.length / 2)

    end = (end)
      ? end
      : (begin === 0)
        ? Math.ceil(array.length / 2)
        : array.length

    return array.slice(begin, end)
  }
}
