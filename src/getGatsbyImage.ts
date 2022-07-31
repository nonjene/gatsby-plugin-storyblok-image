import type { IGatsbyImageData } from 'gatsby-plugin-image/dist/src/components/gatsby-image.browser'

import getBasicImageProps from './utils/getBasicImageProps'
import getWidths from './utils/getWidths'
import buildImageUrl, { buildLowFiUrl } from './utils/buildImageUrl'
import { defaultOptions } from './defaults'
import { GetGatsbyImageOptions, MergedGetGatsbyImageOptions } from './typings/module'

export default function getGatsbyImage(imageRaw: string, args: GetGatsbyImageOptions): IGatsbyImageData | null {
  if (imageRaw.endsWith('.svg')) {
    return null
  }
  // reset when url containing image config
  const image = imageRaw.replace(/\/m\/[^.]*$/, '')

  const imageProps = getBasicImageProps(image)

  // url not identified as Storyblok image
  if (!imageProps) {
    return null
  }

  const options: MergedGetGatsbyImageOptions = {
    ...defaultOptions,
    ...args
  }
  const {
    metadata: { dimensions },
    originalPath
  } = imageProps

  const width = options.width || 0
  const height = options.height || 0

  const desiredAspectRatio = width && height ? width / height : dimensions.aspectRatio

  let outputWidth: number
  let outputHeight: number
  let sizes: string

  // Get output width and height

  switch (true) {
    case options.layout === 'fullWidth':
      outputWidth = desiredAspectRatio
      outputHeight = 1
      break
    case width && !height:
      outputWidth = width
      outputHeight = Math.round(width / desiredAspectRatio)
      break
    case Boolean(!width && height):
      outputWidth = Math.round(height * desiredAspectRatio)
      outputHeight = height
      break
    case Boolean(width && height):
      outputWidth = width
      outputHeight = height
      break
    case !width && !height:
    default:
      outputWidth = dimensions.width
      outputHeight = dimensions.height
      break
  }

  switch (options.layout) {
    case 'constrained':
      sizes = `(min-width: ${outputWidth}px) ${outputWidth}px, 100vw`
      break
    case 'fullWidth':
      sizes = '100vw'
      break
    case 'fixed':
    default:
      sizes = `${outputWidth}px`
      break
  }

  const widths = getWidths(options, outputWidth, dimensions.width)
  const srcSetArr = widths.map((currentWidth) => {
    const resolution = `${currentWidth}w`

    const currentHeight = Math.round(currentWidth / desiredAspectRatio)

    // Workaround for Storyblok has bug when crop with width larger than 4000 (eg: crop 5000 will get 4000)
    // Not to set crop when size is same to source
    const sameToSource = currentWidth === dimensions.width && currentHeight === dimensions.height

    const url = buildImageUrl(originalPath, {
      ...options,
      width: sameToSource ? undefined : currentWidth,
      height: sameToSource ? undefined : currentHeight
    })

    return `${url} ${resolution}`
  })
  const src = buildImageUrl(originalPath, { ...options, width, height })

  return {
    layout: options.layout,
    placeholder: {
      sources: [],
      fallback: options.fallback === false ? null : buildLowFiUrl(originalPath, options)
    },
    backgroundColor: options.backgroundColor || 'transparent',
    images: {
      fallback: {
        src,
        srcSet: srcSetArr.join(',\n') || null,
        sizes
      },
      sources: []
    },
    width: outputWidth,
    height: outputHeight
  }
}
