# gatsby-plugin-storyblok-image

[![Using TypeScript](https://img.shields.io/badge/%3C/%3E-TypeScript-0072C4.svg)](https://www.typescriptlang.org/)
[![Tested with Jest](https://img.shields.io/badge/tested_with-Jest-99424f.svg)](https://github.com/facebook/jest)

_gatsby-plugin-storyblok-image_ let you use gatsby-plugin-image with [Storyblok service v2](https://www.storyblok.com/docs/image-service).

Let you can create any dynamic content in the Storyblok CMS and get advantage with the optimized images outside of GraphQL static query.

Plugin write with Typescript. Props design to be gatsby-plugin-image liked.


## Install

`npm i gatsby-plugin-storyblok-image`

or

`yarn add gatsby-plugin-storyblok-image`


## Usage

```typescript
import { GatsbyImage } from 'gatsby-plugin-image'
import { getGatsbyImageProps } from 'gatsby-plugin-storyblok-image'


export default function Image({ image }) {
  const gatsbyImageData = getGatsbyImageProps(image, {
    // layout can be 'fixed' | 'constrained' | 'fullWidth'
    // see more: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/#layout
    layout: 'fixed',
    
    // use width & height when layout is 'fixed' or 'constrained'
    width: 900,
    height: 900,
    
    // Optional:
    // quality: 100,
    // outputPixelDensities: [1, 2, 3], // for constrained default is [0.25, 0.5, 1, 2, 3]
    // breakpoints	[750, 1080, 1366, 1920], // for fullWidth or constrained
    // backgroundColor: 'transparent', // make the image like fixed object to contain instead of cover. Default not set.

    // Storyblok image service additional options:
    // smartCrop: true, // default true
  })

  return (
    <GatsbyImage {...gatsbyImageData} />
  )
}

```


## Credits

This plugin is the alternate of [gatsby-storyblok-image](https://github.com/bejamas/gatsby-storyblok-image), which is inspired by Sanity's way of implementing gatsby-image outside of GraphQL in their gatsby-source-sanity plugin.
