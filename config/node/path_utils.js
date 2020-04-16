const normalizePathForRegex = path =>
  path
    .replace(new RegExp("/", "g"), "\\/")
    .replace(new RegExp("\\.", "g"), "\\\\.")

module.exports = { normalizePathForRegex }
