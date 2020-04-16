const path = require("path")

const blogPostsConfig = require("./blog_posts")
const { normalizePathForRegex } = require("./path_utils")

const createBlogPostsPages = async ({ createPage, graphql }) => {
  const component = path.resolve("./src/templates/blog/post.js")
  const basePath = normalizePathForRegex(blogPostsConfig.absolutePath)
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
      path: path.join("/blog", slug),
    })
  )
}

module.exports = async ({ actions, graphql }) => {
  const { createPage } = actions

  await createBlogPostsPages({ createPage, graphql })
}
