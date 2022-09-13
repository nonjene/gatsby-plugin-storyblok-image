import getGatsbyImage from '../getGatsbyImage'

describe('getGatsbyImage', () => {
  const IMG_URL = 'https://a.storyblok.com/f/143948/1200x1000/99335d0004/bk-1200-hoang-lan-ph-m.png'

  describe('when layout is fixed', () => {
    it('should match the return data when provide width & height & quality', () => {
      expect(
        getGatsbyImage(IMG_URL, {
          layout: 'fixed',
          width: 100,
          height: 100,
          quality: 100
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

    it('should use original width & height when both not provided', () => {
      expect(
        getGatsbyImage(IMG_URL, {
          layout: 'fixed'
        })
      ).toEqual({
        layout: 'fixed',
        placeholder: {
          sources: [],
          fallback: IMG_URL + '/m/20x0/filters:quality(70)'
        },
        backgroundColor: 'transparent',
        images: {
          sources: [],
          fallback: {
            src: `${IMG_URL}/m/smart`,
            srcSet: `${IMG_URL}/m/smart 1200w`,
            sizes: '1200px'
          }
        },
        width: 1200,
        height: 1000
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
    it('should keep aspect ratio when width is larger than the source', () => {
      expect(
        getGatsbyImage(IMG_URL, {
          layout: 'constrained',
          width: 1300,
          height: 1000
        })?.images.fallback.srcSet
      ).toMatchInlineSnapshot(`
        "https://a.storyblok.com/f/143948/1200x1000/99335d0004/bk-1200-hoang-lan-ph-m.png/m/750x577/smart 750w,
        https://a.storyblok.com/f/143948/1200x1000/99335d0004/bk-1200-hoang-lan-ph-m.png/m/1080x831/smart 1080w,
        https://a.storyblok.com/f/143948/1200x1000/99335d0004/bk-1200-hoang-lan-ph-m.png/m/1200x923/smart 1200w"
      `)
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
