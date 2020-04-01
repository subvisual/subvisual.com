const path = require("path")

const blogPostsConfig = require("./blog_posts")

const createBlogPostsPages = async ({ createPage, graphql }) => {
  const component = path.resolve("./src/templates/blog/post.js")
  const basePath = blogPostsConfig.absolutePath.replace(
    new RegExp("/", "g"),
    "\\/"
  )
  const query = `
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/^${basePath}/" } },
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        nodes {
          fields {
            slug
          }
        }
      }
    }
  `
  const results = await graphql(query)

  results.data.allMarkdownRemark.nodes.forEach(({ fields: { slug } }) =>
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
