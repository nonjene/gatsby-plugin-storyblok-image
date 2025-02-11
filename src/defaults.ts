import { MergedGetGatsbyImageOptions } from './typings/module'

export const STORYBLOK_BASE_URL = 'https://a.storyblok.com'

export const defaultOptions: Omit<MergedGetGatsbyImageOptions, 'layout'> = {
  smartCrop: true,
  outputPixelDensities: [1, 2, 3],
  breakpoints: [750, 1080, 1366, 1920],
  fitIn: false,
  fitInColor: 'transparent',
  fallbackQuality: 70
}
