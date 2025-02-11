export interface GetGatsbyImageOptions {
  layout: 'fixed' | 'constrained' | 'fullWidth'
  // width & height can be auto detect as Storyblok have calc & mark it in the URL
  width?: number
  height?: number
  quality?: number
  outputPixelDensities?: number[]
  breakpoints?: number[]
  fitIn?: boolean
  fitInColor?: string
  backgroundColor?: string
  smartCrop?: boolean
  // Simply disable the fallback image when the low resolution image is not used
  fallback?: false
  fallbackQuality?: number
}

export interface MergedGetGatsbyImageOptions extends GetGatsbyImageOptions {
  outputPixelDensities: number[]
  breakpoints: number[]
  smartCrop: boolean
  fitInColor: string
  fitIn: boolean
  fallbackQuality: number
}
