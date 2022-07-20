import { MergedGetGatsbyImageOptions } from '../typings/module'

export default function getWidths(
  options: MergedGetGatsbyImageOptions,
  fixedWidth: number,
  resourceWidth: number
): number[] {
  const widths: number[] = []
  switch (options.layout) {
    case 'fixed':
      widths.push(...options.outputPixelDensities.map((scale) => Math.round(fixedWidth * scale)))
      break
    case 'fullWidth':
      widths.push(...options.breakpoints)
      break
    case 'constrained':
      widths.push(
        ...options.outputPixelDensities.map((scale) => Math.round(fixedWidth * scale)),
        ...options.breakpoints
      )
      break
    default:
      break
  }

  // For better matching of the image, we should add the original resource size when is not fixed layout
  if (['fullWidth', 'constrained'].includes(options.layout)) {
    widths.push(resourceWidth)
  }

  return [...new Set(widths.filter((width) => width <= resourceWidth && width > 0))].sort((a, b) => a - b)
}
