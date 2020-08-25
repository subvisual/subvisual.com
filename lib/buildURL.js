/** Build a URL for this site.
 */
module.exports = (pathname = "/") => {
  const url = new URL(process.env.URL || "http://localhost:8000")

  url.pathname = pathname

  return url
}
