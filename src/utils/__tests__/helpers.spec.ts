import { isWebP } from '../helpers'

describe('isWebP', () => {
  it('should return true when url includes fitler format(webp)', () => {
    expect(isWebP('https://example.com/image.png/m/filters:format(webp)')).toBe(true)
  })

  it('should return true when url ends with .webp', () => {
    expect(isWebP('https://example.com/image.webp')).toBe(true)
  })
})
