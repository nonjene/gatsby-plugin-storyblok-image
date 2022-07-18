import getBasicImageProps from './utils/getBasicImageProps'
import buildUrl, { buildLowFiUrl } from './utils/buildImageUrl'
import { isWebP } from './utils/helpers'
import { sizeMultipliersFixed, defaultFixedOptions } from './defaults'
import { FixedImageOptions } from './typings/module'

function getFixedGatsbyImage(image: string, args: FixedImageOptions) {
  const imageProps = getBasicImageProps(image)

  if (!imageProps) {
    return null
  }

  const options: FixedImageOptions = {
    ...defaultFixedOptions,
    ...args
  }

  const {
    metadata: { dimensions, lqip },
    originalPath
  } = imageProps

  const width = options.width || dimensions.width
  const height = options.height || dimensions.height

  let desiredAspectRatio = dimensions.aspectRatio
  // If we're cropping, calculate the specified aspect ratio
  if (options.width && options.height) {
    desiredAspectRatio = options.width / options.height
  }

  let forceConvert: string | null = null
  if (options.toFormat) {
    forceConvert = options.toFormat
  } else if (isWebP(originalPath)) {
    forceConvert = 'jpg'
  }

  const widths = sizeMultipliersFixed.map((scale) => Math.round(width * scale))

  const srcSets = widths
    .filter((currentWidth) => currentWidth < dimensions.width)
    .reduce(
      (acc, currentWidth, i) => {
        let resolution = `${sizeMultipliersFixed[i]}x`
        let currentHeight = Math.round(currentWidth / desiredAspectRatio)

        let size = {
          ...options,
          width: currentWidth,
          height: currentHeight
        }

        let webpUrl = buildUrl(originalPath, {
          ...size,
          ...{ format: 'webp' }
        })

        let baseUrl = buildUrl(originalPath, {
          ...size,
          ...(forceConvert && { format: forceConvert })
        })

        acc.webp.push(`${webpUrl} ${resolution}`)
        acc.base.push(`${baseUrl} ${resolution}`)

        return acc
      },
      { webp: [], base: [] } as { webp: string[]; base: string[] }
    )

  let outputHeight = Math.round(height ? height : width / desiredAspectRatio)

  let imgSize = {
    ...options,
    width: width,
    height: outputHeight
  }

  let src = buildUrl(originalPath, {
    ...imgSize,
    ...(forceConvert && { format: forceConvert })
  })

  let srcWebp = buildUrl(originalPath, {
    ...imgSize,
    ...{ format: 'webp' }
  })

  // base64String

  return {
    base64:
      options.base64 ||
      buildLowFiUrl(originalPath, {
        width,
        height,
        aspectRatio: desiredAspectRatio
      }),
    aspectRatio: desiredAspectRatio,
    width: Math.round(width),
    height: outputHeight,
    src,
    srcWebp,
    srcSet: srcSets.base.join(',\n') || null,
    srcSetWebp: srcSets.webp.join(',\n') || null
  }
}

export default getFixedGatsbyImage
