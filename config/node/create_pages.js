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
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        nodes {
          frontmatter {
            path
          }
        }
      }
    }
  `
  const results = await graphql(query)

  results.data.allMarkdownRemark.nodes.forEach(
    ({ frontmatter: { path: slug } }) =>
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
