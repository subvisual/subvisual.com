module.exports = () => {
  if (process.env.NODE_ENV === "production" && !process.env.URL) {
    throw new Error(`
    URL environment variable must be set for production builds, to allow the
    generation of URLs for pages and assets.
    `)
  }
}
