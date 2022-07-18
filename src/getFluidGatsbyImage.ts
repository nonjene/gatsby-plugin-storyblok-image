import getBasicImageProps from './utils/getBasicImageProps'
import buildUrl, { buildLowFiUrl } from './utils/buildImageUrl'
import { isWebP } from './utils/helpers'
import { sizeMultipliersFluid, defaultFluidOptions } from './defaults'
import { FluidImageOptions } from './typings/module'

function getFluidGatsbyImage(image: string, args: FluidImageOptions) {
  let imageProps = getBasicImageProps(image)

  if (!imageProps) {
    return null
  }

  const options: FluidImageOptions = {
    ...defaultFluidOptions,
    ...args
  }

  const {
    metadata: { dimensions, lqip },
    originalPath
  } = imageProps

  let maxWidth = options.maxWidth || dimensions.width
  const maxHeight = options.maxHeight || Math.round(maxWidth / dimensions.aspectRatio)

  let desiredAspectRatio = dimensions.aspectRatio

  // If we're cropping, calculate the specified aspect ratio
  if (maxHeight && maxWidth) {
    desiredAspectRatio = maxWidth / maxHeight
  }

  let forceConvert: null | string = null
  if (options.toFormat) {
    forceConvert = options.toFormat
  } else if (isWebP(originalPath)) {
    forceConvert = 'jpg'
  }

  const sizes = options.sizes || `(max-width: ${maxWidth}px) 100vw, ${maxWidth}px`
  const widths = sizeMultipliersFluid
    .map((scale) => Math.round(maxWidth * scale))
    .filter((width) => width < dimensions.width)
    .concat(dimensions.width)

  const srcSets = widths
    .filter((currentWidth) => currentWidth < dimensions.width)
    .reduce(
      (acc, currentWidth) => {
        let currentHeight = Math.round(currentWidth / desiredAspectRatio)

        let size = {
          width: currentWidth,
          height: currentHeight
        }

        let webpUrl = buildUrl(originalPath, {
          ...options,
          ...size,
          ...{ format: 'webp' }
        })

        let baseUrl = buildUrl(originalPath, {
          ...options,
          ...size,
          ...{ format: forceConvert }
        })

        acc.webp.push(`${webpUrl} ${currentWidth}w`)
        acc.base.push(`${baseUrl} ${currentWidth}w`)
        return acc
      },
      { webp: [], base: [] } as { webp: string[]; base: string[] }
    )

  let imgSize = { width: maxWidth, height: maxHeight }

  const src = buildUrl(originalPath, {
    ...options,
    ...imgSize,
    ...{ format: forceConvert }
  })

  const srcWebp = buildUrl(originalPath, {
    ...options,
    ...imgSize,
    ...{ format: 'webp' }
  })

  return {
    base64:
      options.base64 ||
      buildLowFiUrl(originalPath, { width: maxWidth, height: maxHeight, aspectRatio: desiredAspectRatio }),
    aspectRatio: desiredAspectRatio,
    src,
    srcWebp,
    srcSet: srcSets.base.join(',\n') || null,
    srcSetWebp: srcSets.webp.join(',\n') || null,
    sizes
  }
}

export default getFluidGatsbyImage
