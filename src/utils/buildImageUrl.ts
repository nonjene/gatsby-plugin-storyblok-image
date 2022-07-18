import { STORYBLOK_BASE_URL } from '../defaults'
import { applyFilters } from './helpers'

interface Image {
  width: number
  height: number
  smartCrop?: boolean | null
  quality?: number | null
  format?: string | null
  fill?: boolean | null
  aspectRatio?: number | null
}
export default function buildImageUrl(originalPath: string, image: Image) {
  let { width, height, smartCrop, quality, format, fill } = image

  let [, extension] = originalPath.split('.')

  let url = STORYBLOK_BASE_URL

  if (width && height) {
    url += `/${width}x${height}`
  }

  if (smartCrop) {
    url += `/smart`
  }

  const filters = [
    ...[quality && `quality(${quality})`],
    ...[format && format !== extension && `format(${format})`],
    ...[fill && `fill(${fill})`]
  ].filter(Boolean) as string[]

  if (filters.length > 0) {
    url += applyFilters(filters)
  }

  // add original path at the end
  url += `/${originalPath}`

  return url
}

export function buildLowFiUrl(originalPath: string, { width, height, aspectRatio }: Image) {
  return buildImageUrl(originalPath, {
    width: Number((width / 3).toFixed(0)),
    height: Number((height / 3).toFixed(0)),
    quality: 10
  })
}
