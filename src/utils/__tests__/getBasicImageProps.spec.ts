import getBasicImageProps from '../getBasicImageProps'

describe('getBasicImageProps', () => {
  it('should compat when link is start with //', () => {
    expect(getBasicImageProps('//a.storyblok.com/f/79434/1860x1860/f653050665/foo.png')).toMatchInlineSnapshot(`
      Object {
        "extension": "png",
        "metadata": Object {
          "dimensions": Object {
            "aspectRatio": 1,
            "height": 1860,
            "width": 1860,
          },
        },
        "originalPath": "f/79434/1860x1860/f653050665/foo.png",
      }
    `)
  })
})
