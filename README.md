# gatsby-plugin-storyblok-image

Branch from _gatsby-storyblok-image_, to support for gatsby-plugin-image

_gatsby-storyblok-image_ lets you use gatsby-image together with Storyblok outside of GraphQL.

## Install

`npm i gatsby-plugin-storyblok-image`

or

`yarn add gatsby-plugin-storyblok-image`

## Usage

### Fixed image

```javascript
import { GatsbyImage } from 'gatsby-plugin-image'
import { getFixedGatsbyImage } from 'gatsby-plugin-storyblok-image'

const FixedImage = ({ blok }) => {
  const gatsbyImageData = getFixedGatsbyImage(blok.image, {
    width: 900
  })

  return (
    <GatsbyImage {...gatsbyImageData} />
  )
}

export default FixedImage
```

---

### Fluid image

```javascript
import { GatsbyImage } from 'gatsby-plugin-image'
import { getFluidGatsbyImage } from 'gatsby-plugin-storyblok-image'

const FluidImage = ({ blok }) => {
  const gatsbyImageData = getFluidGatsbyImage(blok.image, {
    maxWidth: 900
  })

  return (
    <GatsbyImage {...gatsbyImageData} />
  )
}

export default FluidImage
```

## Credits

This plugin is inspired by Sanity's way of implementing gatsby-image outside of GraphQL in their gatsby-source-sanity plugin.
