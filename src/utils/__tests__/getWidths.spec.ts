import getWidths from '../getWidths'

describe('getWidths', () => {
  it('when is fixed, should only use the pixelDensities', () => {
    expect(
      getWidths(
        {
          layout: 'fixed',
          outputPixelDensities: [1, 2, 3],
          breakpoints: [400, 500, 600],
          quality: 100,
          smartCrop: true
        },

        200,
        1200
      )
    ).toMatchInlineSnapshot(`
      Array [
        200,
        400,
        600,
      ]
    `)
  })

  it('when is constrained, should only use both pixelDensities & breakpoint', () => {
    expect(
      getWidths(
        {
          layout: 'constrained',
          outputPixelDensities: [1, 2, 3],
          breakpoints: [400, 500, 600],
          quality: 100,
          smartCrop: true
        },

        200,
        1200
      )
    ).toMatchInlineSnapshot(`
      Array [
        200,
        400,
        500,
        600,
        1200,
      ]
    `)
  })

  it('when is full width, should only use breakpoint', () => {
    expect(
      getWidths(
        {
          layout: 'fullWidth',
          outputPixelDensities: [1, 2, 3],
          breakpoints: [400, 500, 600],
          quality: 100,
          smartCrop: true
        },

        200,
        1200
      )
    ).toMatchInlineSnapshot(`
      Array [
        400,
        500,
        600,
        1200,
      ]
    `)
  })
})
