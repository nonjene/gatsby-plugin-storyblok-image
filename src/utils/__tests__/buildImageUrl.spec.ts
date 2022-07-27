import buildImageUrl from '../buildImageUrl'

describe('buildImageUrl', () => {
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
