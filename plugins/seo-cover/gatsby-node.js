const path = require("path")
const _ = require("lodash")
const fs = require("fs")
const util = require("util")
const exec = util.promisify(require("child_process").exec)
const mkdtemp = util.promisify(require("fs").mkdtemp)
const os = require("os")

const FONT_PATH = path.resolve(__dirname, "acta-headline-extra-bold.woff")
const FILE_NAME = "seo.png"

const makeTmpFolder = () => mkdtemp(path.join(os.tmpdir(), "seo-cover-"))

const transform = async ({ text, path: filePath }) => {
  const bg = "#2421AB"
  const res = "2160x1080"
  const tmp = await makeTmpFolder()

  let lines = [text]

  if (text.length > 30) {
    lines = text.split(" ").reduce((memo, word) => {
      if (memo.length === 0) {
        memo.push(word)
        return memo
      }

      if (memo[memo.length - 1].length + word.length < 30) {
        memo[memo.length - 1] += " " + word
      } else {
        memo.push(word)
      }

      return memo
    }, [])
  }

  const multilineText = lines.join("\n")

  const folderPath = path.dirname(filePath)

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true })
  }

  await exec(`convert -size ${res} xc:${bg} ${tmp}/bg.png`)

  const { err } = await exec(
    `convert -page +0+0 ${tmp}/bg.png -size ${res} xc:"#00000000" -fill white -pointsize 95 -gravity northwest -annotate +100+160 'Blog Post' -gravity southwest -font ${FONT_PATH} -annotate +100+100 "${multilineText}" -layers merge +repage ${filePath}`
  )

  if (err) console.error(err)
}

module.exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, deletePage } = actions

  if (!page.context || !page.context.isBlogPost) return
  if (page.context.seoImage || page.context.cover) return

  await transform({
    text: page.context.title,
    path: path.join("public", page.path, FILE_NAME),
  })

  const oldPage = Object.assign({}, page)
  deletePage(oldPage)

  page.context.seoImage = path.join(page.path, FILE_NAME)
  createPage(page)
}
