import UAParser from "ua-parser-js"

export default () => {
  if (!window || !window.navigator) return undefined

  const parser = new UAParser(window.navigator.userAgent)

  return parser.getResult()
}
