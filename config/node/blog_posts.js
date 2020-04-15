const path = require("path")

const relativePath = "src/posts"
const absolutePath = path.join(__dirname, "../..", relativePath)

module.exports = { absolutePath, relativePath }
