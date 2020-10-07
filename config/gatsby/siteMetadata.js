const siteUrl = process.env.URL || "http://localhost:8000"

module.exports = {
  description: "We nurture ideas that empower people",
  image: new URL("/images/meta-image.jpg", siteUrl).toString(),
  lang: "en",
  siteUrl,
  title: "Subvisual",
  twitter: {
    creator: "@subvisual",
  },
}
