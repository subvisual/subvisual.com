const fs = require("fs")
const path = require("path")
const isString = require("lodash/isString")
const isURL = require("@subvisual/utils/isURL")

const getFullPath = ({ image, node }) => {
  if (isURL(image) || path.isAbsolute(image)) return image

  const dirname = path.dirname(node.fileAbsolutePath)

  return path.resolve(dirname, image)
}

const getFullImage = ({ image, node }) => {
  if (!isString(image)) return image

  const fullPath = getFullPath({ image, node })

  return fs.existsSync(fullPath) ? fullPath : undefined
}

const getBlogPostPath = ({ frontmatter }) => {
  if (!frontmatter.path) return undefined

  return path.posix.join("/blog", "posts", frontmatter.path, "/")
}

const getBlogPostURL = (node) => {
  const { frontmatter } = node

  if (!frontmatter.path) return undefined

  const urlBase = process.env.URL || "http://localhost:8000"
  const urlPath = getBlogPostPath(node)

  return new URL(urlPath, urlBase).toString()
}

module.exports = async ({ node, actions }) => {
  // Skip this logic unless the node was created by processing a markdown file
  if (node.internal.type !== "MarkdownRemark") return

  const { createNodeField } = actions

  console.log(
    node.frontmatter.path,
    getFullImage({ image: node.frontmatter.cover, node })
  )
  createNodeField({
    node,
    name: "cover",
    value: getFullImage({ image: node.frontmatter.cover, node }),
  })
  createNodeField({
    node,
    name: "seoImage",
    value: getFullImage({ image: node.frontmatter.seoImage, node }),
  })
  createNodeField({ node, name: "url", value: getBlogPostURL(node) })
  createNodeField({ node, name: "path", value: getBlogPostPath(node) })
}
