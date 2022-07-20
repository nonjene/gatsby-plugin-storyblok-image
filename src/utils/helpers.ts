export function applyFilters(filters: string[]) {
  if (filters.length === 0) {
    return ''
  }
  return `/filters:${filters.join(':')}`
}

export function isWebP(url: string) {
  const isConverted = url.includes('filters:format(webp)')
  const isOriginal = /\.webp$/.test(url)
  return isConverted || isOriginal
}
