const path = require("path")
const _ = require("lodash")
const fs = require("fs")
const { registerFont, createCanvas } = require("canvas")

registerFont(path.resolve(__dirname, "acta-headline-extra-bold.woff"), {
  family: "Acta",
})

const WIDTH = 2160
const HEIGHT = 1080
const FILE_NAME = "seo.png"

const transform = ({ text, path: filePath }) => {
  const canvas = createCanvas(WIDTH, HEIGHT)
  const ctx = canvas.getContext("2d")

  ctx.fillStyle = "#2421AB"
  ctx.fillRect(0, 0, WIDTH, HEIGHT)

  ctx.font = 'regular 80px "Arial"'
  ctx.fillStyle = "#fff"
  ctx.textAlign = "left"
  ctx.textBaseline = "top"
  ctx.fillText("Blog Post", 115, 95)

  ctx.font = '170px "Acta"'
  ctx.fillStyle = "#fff"
  ctx.textAlign = "left"
  ctx.textBaseline = "bottom"

  let lines = [text]

  if (text.length > 20) {
    lines = text.split(" ").reduce((memo, word) => {
      if (memo.length === 0) {
        memo.push(word)
        return memo
      }

      if (memo[memo.length - 1].length + word.length < 20) {
        memo[memo.length - 1] += " " + word
      } else {
        memo.push(word)
      }

      return memo
    }, [])
  }

  lines.forEach((line, i) => {
    ctx.fillText(line, 100, HEIGHT - 50 - (lines.length - i - 1) * 210)
  })

  const buffer = canvas.toBuffer("image/png")

  const folderPath = path.dirname(filePath)

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true })
  }

  fs.writeFileSync(filePath, buffer)
}

module.exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  if (!page.context || !page.context.isBlogPost) return
  if (page.context.seoImage || page.context.cover) return

  transform({
    text: page.context.title,
    path: path.join("public", page.path, FILE_NAME),
  })

  const oldPage = Object.assign({}, page)
  deletePage(oldPage)

  page.context.seoImage = path.join(page.path, FILE_NAME)
  createPage(page)
}
