const path = require("path")

const { normalizePathForRegex } = require("./path_utils")

const createBlogPostsPages = async ({ createPage, graphql }) => {
  const blogPostsAbsolutePath = path.resolve(__dirname, "../../src/posts")
  const component = path.resolve(__dirname, "../../src/templates/blog/post.js")
  const basePath = normalizePathForRegex(blogPostsAbsolutePath)
  const query = `
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/^${basePath}/" } },
      ) {
        distinct(field: frontmatter___path)
      }
    }
  `
  const results = await graphql(query)

  results.data.allMarkdownRemark.distinct.forEach(slug =>
    createPage({
      component,
      context: { slug },
      path: path.posix.join("/blog", slug),
    })
  )
}

module.exports = async ({ actions, graphql }) => {
  const { createPage } = actions

  await createBlogPostsPages({ createPage, graphql })
}
