import { MEDIA_SIZE } from '../constants'

const minWidth = {
  xs: `(min-width: ${MEDIA_SIZE.xs}px)`,
  sm: `(min-width: ${MEDIA_SIZE.sm}px)`,
  md: `(min-width: ${MEDIA_SIZE.md}px)`,
  lg: `(min-width: ${MEDIA_SIZE.lg}px)`,
  xl: `(min-width: ${MEDIA_SIZE.xl}px)`,
  xxl: `(min-width: ${MEDIA_SIZE.xxl}px)`,
}

const maxWidth = {
  xs: `(max-width: ${MEDIA_SIZE.xs - 1}px)`,
  sm: `(max-width: ${MEDIA_SIZE.sm - 1}px)`,
  md: `(max-width: ${MEDIA_SIZE.md - 1}px)`,
  lg: `(max-width: ${MEDIA_SIZE.lg - 1}px)`,
  xl: `(max-width: ${MEDIA_SIZE.xl - 1}px)`,
  xxl: `(max-width: ${MEDIA_SIZE.xxl - 1}px)`,
}

export { minWidth, maxWidth }
