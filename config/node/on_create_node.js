const path = require("path")
const isString = require("lodash/isString")
const isUndefined = require("lodash/isUndefined")

const { isURL } = require("../../src/utils/urlUtils")

const { NODE_ENV } = process.env

const resolveBlogPostCover = ({ cover, node }) => {
  const { fileAbsolutePath } = node

  if (isURL(cover) || path.isAbsolute(cover)) return cover

  const dirname = path.dirname(fileAbsolutePath)

  return path.resolve(dirname, cover)
}

const prepareBlogPostCover = ({ node }) => {
  const { frontmatter } = node
  const { cover } = frontmatter

  if (isString(cover)) return resolveBlogPostCover({ cover, node })

  return cover
}

const prepareBlogPostUrl = ({ node }) => {
  if (NODE_ENV === "production" && isUndefined(URL)) {
    throw new Error(`
    URL environment variable must be set for production build to allow
    generation of blog posts URLs.
    `)
  }

  const urlBase = isURL(process.env.URL)
    ? process.env.URL
    : "http://localhost:8000"
  const urlPath = path.posix.join("/blog", node.frontmatter.path)

  return new URL(urlPath, urlBase).toString()
}

module.exports = async ({ node, actions }) => {
  // Skip this logic unless the node was created by processing a markdown file
  if (node.internal.type !== "MarkdownRemark") return

  const { createNodeField } = actions
  const cover = prepareBlogPostCover({ node })
  const url = prepareBlogPostUrl({ node })

  createNodeField({ node, name: "cover", value: cover })
  createNodeField({ node, name: "url", value: url })
}
