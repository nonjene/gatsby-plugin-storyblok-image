export interface BaseOptions {
  quality?: number | null
  smartCrop?: boolean | null
  // format is dead prop
  format?: string | null
  fill?: boolean | null
  toFormat?: string | null
  base64?: boolean | null
  useBase64?: boolean | null
}

export interface FixedImageOptions extends BaseOptions {
  width?: number | null
  height?: number | null
}

export interface FluidImageOptions extends BaseOptions {
  maxWidth?: number | null
  maxHeight?: number | null
  sizes?: string
}

export interface OriginalExportFixed {
  base64: string
  aspectRatio: number
  width: number
  height: number
  src: string
  srcWebp: string
  srcSet: string | null
  srcSetWebp: string | null
}

export interface OriginalExportFluid {
  base64: string
  aspectRatio: number
  src: string
  srcWebp: string
  srcSet: string | null
  srcSetWebp: string | null
  sizes: string
}
