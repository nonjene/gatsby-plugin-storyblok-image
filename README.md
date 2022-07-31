# gatsby-plugin-storyblok-image

[![Using TypeScript](https://img.shields.io/badge/%3C/%3E-TypeScript-0072C4.svg)](https://www.typescriptlang.org/)
[![Tested with Jest](https://img.shields.io/badge/tested_with-Jest-99424f.svg)](https://github.com/facebook/jest)
[![Coverage Status](https://coveralls.io/repos/github/nonjene/gatsby-plugin-storyblok-image/badge.svg)](https://coveralls.io/github/nonjene/gatsby-plugin-storyblok-imager)

_gatsby-plugin-storyblok-image_ let you use [gatsby-plugin-image](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image) with [Storyblok service v2](https://www.storyblok.com/docs/image-service).

This is helpful when your images are dynamically in content.

Let you take advantage of optimizing any images inside dynamic content (run-time optimizing), gets out of build-time complex processing of download -> markup each source -> static query for each component.


Plugin write with Typescript. Options design to be gatsby-plugin-image liked.


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
    
    // Use width & height when layout is 'fixed' or 'constrained'
    // No need when layout is 'fullWidth'
    width: 900,
    height: 900,
    
    // Optional:
    // quality: 100,
    // outputPixelDensities: [1, 2, 3], // For fixed or constrained
    // breakpoints	[750, 1080, 1366, 1920], // For fullWidth or constrained
    // backgroundColor: '#fff', // Just pass to gatsby-plugin-image image prop

    /** Storyblok image service additional options: */
    // `fitIn` set `true` to make the image like fixed object to "contain". Refer to https://www.storyblok.com/docs/image-service#fit-in
    // fitIn: true, // Default false (act like "cover")
    // fitInColor: '#fff', // Color to fill when fitIn true. Default is transparent. okay to add `#` prefix.

    // smartCrop: true, // Default true

  })

  return (
    <GatsbyImage {...gatsbyImageData} />
  )
}

```


## Credits

This plugin is the alternate of [gatsby-storyblok-image](https://github.com/bejamas/gatsby-storyblok-image), which is inspired by Sanity's way of implementing gatsby-image outside of GraphQL in their gatsby-source-sanity plugin.
