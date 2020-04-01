const path = require("path")

const relativePath = "src/pages/blog/posts"
const absolutePath = path.join(__dirname, "../..", relativePath)

module.exports = { absolutePath, relativePath }
