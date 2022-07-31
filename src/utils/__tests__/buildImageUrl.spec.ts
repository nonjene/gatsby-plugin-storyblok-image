import buildImageUrl, { buildLowFiUrl } from '../buildImageUrl'

describe('buildImageUrl', () => {
  describe('handle link', () => {
    it('when link start with //', () => {
      expect(
        buildImageUrl('//a.storyblok.com/f/79434/1860x1860/f653050665/foo.png', {
          width: 600
        })
      ).toMatchInlineSnapshot(`"//a.storyblok.com/f/79434/1860x1860/f653050665/foo.png/m/600x0"`)
    })

    it('when link start with http://', () => {
      expect(
        buildImageUrl('http://a.storyblok.com/f/79434/1860x1860/f653050665/foo.png', {
          width: 600
        })
      ).toMatchInlineSnapshot(`"http://a.storyblok.com/f/79434/1860x1860/f653050665/foo.png/m/600x0"`)
    })

    it('when link start with pathname', () => {
      expect(
        buildImageUrl('/f/79434/1860x1860/f653050665/foo.png', {
          width: 600
        })
      ).toMatchInlineSnapshot(`"https://a.storyblok.com/f/79434/1860x1860/f653050665/foo.png/m/600x0"`)

      expect(
        buildImageUrl('f/79434/1860x1860/f653050665/foo.png', {
          width: 600
        })
      ).toMatchInlineSnapshot(`"https://a.storyblok.com/f/79434/1860x1860/f653050665/foo.png/m/600x0"`)
    })
  })
  describe('url param config', () => {
    it('should add fit-in param when fitIn is true', () => {
      expect(
        buildImageUrl('f/79434/1860x1860/f653050665/foo.png', {
          width: 600,
          fitIn: true
        })
      ).toMatchInlineSnapshot(
        `"https://a.storyblok.com/f/79434/1860x1860/f653050665/foo.png/m/fit-in/600x0/filters:fill(transparent)"`
      )
    })
  })
})

describe('buildLowFiUrl', () => {
  it('should set height when it is set', () => {
    expect(buildLowFiUrl('f/79434/1860x1860/f653050665/foo.png', { width: 500, height: 300, fitIn: true })).toBe(
      'https://a.storyblok.com/f/79434/1860x1860/f653050665/foo.png/m/fit-in/20x12/filters:quality(10):fill(transparent)'
    )
  })
})
