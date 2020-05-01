import _isUndefined from "lodash/isUndefined"

export function getViewportSize(window) {
  if (_isUndefined(window)) {
    return { width: undefined, height: undefined }
  }

  const { innerWidth, innerHeight } = window

  return { width: innerWidth, height: innerHeight }
}

export function isViewportLandscapeOriented(window) {
  const { width, height } = getViewportSize(window)

  return width > height
}

export function isViewportPortraitOriented(window) {
  const { width, height } = getViewportSize(window)

  return width < height
}
