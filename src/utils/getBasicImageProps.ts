const validImageUrlPattern =
  /^(https?:)?\/\/a.storyblok.com\/f\/*[0-9]+\/*[0-9]*x*[0-9]*\/[A-Za-z0-9]+\/[\S]+\.[a-zA-Z]+/

const storyblokRegex = /^(https?:)?\/\/a.storyblok.com\//

export default function getBasicImageProps(url: string) {
  if (!url || !validImageUrlPattern.test(url)) {
    return null
  }

  let originalPath = url.replace(storyblokRegex, '')

  let [, , dimensions, , filename] = originalPath.split('/')
  let [width, height] = dimensions.split('x').map((num) => Number(num))
  let [, extension] = filename.split('.')

  let aspectRatio = width / height
  let metadata = { dimensions: { width, height, aspectRatio } }

  return {
    originalPath,
    extension,
    metadata
  }
}
