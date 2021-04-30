const siteUrl =
  process.env.URL || process.env.DEPLOY_PRIME_URL || "http://localhost:8000"

module.exports = {
  description: "We nurture ideas that empower people",
  image: new URL("/images/meta.png", siteUrl).toString(),
  lang: "en",
  siteUrl,
  title: "Subvisual",
  twitter: {
    creator: "@subvisual",
  },
}
