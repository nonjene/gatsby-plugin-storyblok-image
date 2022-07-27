import { STORYBLOK_BASE_URL } from '../defaults'
import { applyFilters } from './helpers'
import { MergedGetGatsbyImageOptions } from '../typings/module'

interface Image
  extends Partial<
    Pick<MergedGetGatsbyImageOptions, 'width' | 'height' | 'smartCrop' | 'quality' | 'fitIn' | 'fitInColor'>
  > {}

const TRANSPARENT = 'transparent'

const regexIsFullUrl = /(http?:|)\/\//

export default function buildImageUrl(originalPath: string, image: Image): string {
  const { width, height, smartCrop, quality, fitIn, fitInColor } = image

  // const [, extension] = originalPath.split('.')

  // base url
  let url = ''

  // compat path is a full url or just path
  if (!regexIsFullUrl.test(originalPath)) {
    url += STORYBLOK_BASE_URL
    if (!originalPath.startsWith('/')) {
      url += '/'
    }
  }

  url += originalPath + '/m'

  if (fitIn) {
    url += '/fit-in'
  }

  if (width || height) {
    url += `/${width || 0}x${height || 0}`
  }

  if (smartCrop) {
    url += `/smart`
  }

  const filters = [
    quality && `quality(${quality})`,
    // format && format !== extension && `format(${format})`,
    fitIn && `fill(${(fitInColor || TRANSPARENT).replace('#', '')})`
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

export function buildLowFiUrl(originalPath: string, opt?: Pick<Image, 'fitIn'>): string {
  return buildImageUrl(originalPath, {
    width: 20,
    quality: 10,
    fitIn: opt?.fitIn
  })
}
