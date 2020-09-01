const url = process.env.URL || "http://localhost:8000"

module.exports = {
  description: "We nurture ideas that empower people",
  image: new URL("/images/meta-image.jpg", url).toString(),
  lang: "en",
  title: "Subvisual",
  twitter: {
    creator: "@subvisual",
  },
  url,
}
