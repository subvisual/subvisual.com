const path = require("path")

const { normalizePathForRegex } = require("./path_utils")

const ROOT = path.resolve(__dirname, "../..")
const BLOG_POSTS_ABSOLUTE_PATH = path.resolve(ROOT, "src/posts")

const createBlogAuthorsPages = async ({ createPage, graphql }) => {
  const component = path.resolve(
    __dirname,
    "../../src/templates/blog/author.js"
  )
  const basePath = normalizePathForRegex(BLOG_POSTS_ABSOLUTE_PATH)
  const query = `
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/^${basePath}/" } }
      ) {
        distinct(field: frontmatter___author___key)
      }
    }
  `
  const results = await graphql(query)

  results.data.allMarkdownRemark.distinct.forEach((authorKey) =>
    createPage({
      component,
      context: { authorKey, blogPostsPathRegex: `/^${basePath}/` },
      path: path.posix.join("/blog/author", authorKey),
    })
  )
}

const createBlogPostsPages = async ({ createPage, graphql }) => {
  const component = path.resolve(ROOT, "src/templates/blog/post.js")
  const basePath = normalizePathForRegex(BLOG_POSTS_ABSOLUTE_PATH)
  const query = `
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/^${basePath}/" } }
      ) {
        nodes {
          fields {
            cover
            seoImage
          }
          frontmatter {
            path
          }
        }
      }
    }
  `
  const results = await graphql(query)

  results.data.allMarkdownRemark.nodes.forEach((node) => {
    const { fields, frontmatter } = node
    const { cover, seoImage } = fields
    const { path: slug } = frontmatter

    createPage({
      component,
      context: { cover, seoImage, slug },
      path: path.posix.join("/blog", slug),
    })
  })
}

module.exports = async ({ actions, graphql }) => {
  const { createPage } = actions

  await createBlogAuthorsPages({ createPage, graphql })
  await createBlogPostsPages({ createPage, graphql })
}
