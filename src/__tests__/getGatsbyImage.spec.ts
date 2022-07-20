import type { IGatsbyImageData } from 'gatsby-plugin-image/dist/src/components/gatsby-image.browser'

import getGatsbyImage from '../getGatsbyImage'

describe('getGatsbyImage', () => {
  const IMG_URL = 'https://a.storyblok.com/f/143948/1200x1000/99335d0004/bk-1200-hoang-lan-ph-m.png'

  describe('when layout is fixed', () => {
    it('should match the return data when provide width & height', () => {
      expect(
        getGatsbyImage(IMG_URL, {
          layout: 'fixed',
          width: 100,
          height: 100
        })
      ).toMatchSnapshot()
    })

    it('should match the return data when provide only width', () => {
      expect(
        getGatsbyImage(IMG_URL, {
          layout: 'fixed',
          width: 100
        })
      ).toMatchSnapshot()
    })
    it('should match the return data when provide only height', () => {
      expect(
        getGatsbyImage(IMG_URL, {
          layout: 'fixed',
          height: 100
        })
      ).toMatchSnapshot()
    })

    xit('should use original width & height when both not provided', () => {
      expect(
        getGatsbyImage(IMG_URL, {
          layout: 'fixed'
        })
      ).toEqual({
        layout: 'fixed',
        placeholder: {
          sources: [],
          fallback: IMG_URL + '/m/20x0/filters:quality(10)'
        },
        backgroundColor: 'transparent',
        images: {
          sources: [],
          fallback: {
            src: `${IMG_URL}/m/filters:quality(100)`,
            srcSet: [`${IMG_URL}/m/filters:quality(100) 1200w`],
            sizes: '1200px'
          }
        },
        width: 1200,
        height: 1200
      })
    })
  })

  describe('when layout is constrained', () => {
    it('should match the return data', () => {
      expect(
        getGatsbyImage(IMG_URL, {
          layout: 'constrained',
          width: 100,
          height: 100
        })
      ).toMatchSnapshot()
    })
  })

  describe('when layout is full width', () => {
    it('should match the return data', () => {
      expect(
        getGatsbyImage(IMG_URL, {
          layout: 'fullWidth'
        })
      ).toMatchSnapshot()
    })
  })
})
