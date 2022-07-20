import { STORYBLOK_BASE_URL } from '../defaults'
import { applyFilters } from './helpers'

interface Image {
  width?: number
  height?: number
  smartCrop?: boolean
  quality?: number
  format?: string
  backgroundColor?: string
}

export default function buildImageUrl(originalPath: string, image: Image): string {
  const { width, height, smartCrop, quality, format, backgroundColor } = image

  const [, extension] = originalPath.split('.')

  // base url
  let url = STORYBLOK_BASE_URL + '/' + originalPath + '/m'

  if (width || height) {
    url += `/${width || 0}x${height || 0}`
  }

  if (smartCrop) {
    url += `/smart`
  }

  const filters = [
    ...[quality && `quality(${quality})`],
    ...[format && format !== extension && `format(${format})`],
    ...[backgroundColor && `fill(${backgroundColor.replace('#', '')})`]
  ].filter(Boolean) as string[]

  if (filters.length > 0) {
    url += applyFilters(filters)
  }

  // fullfil the url format when no any filters or size config
  if (url.endsWith('/m')) {
    url += '/'
  }
  return url
}

export function buildLowFiUrl(originalPath: string): string {
  return buildImageUrl(originalPath, {
    width: 20,
    quality: 10
  })
}
