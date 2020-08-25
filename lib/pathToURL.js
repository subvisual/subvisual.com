const isURL = require("@subvisual/utils/isURL")

const buildURL = require("./buildURL")

module.exports = (path) => {
  // If no path is provided, exit early
  if (!path) return undefined

  // If path is already a valid URL, exit early
  if (isURL(path)) return path

  return buildURL(path)
}
