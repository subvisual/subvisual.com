const isURL = (string) => {
  try {
    /* eslint-disable-next-line no-new */
    new URL(string)
  } catch {
    return false
  }

  return true
}

module.exports = { isURL }
