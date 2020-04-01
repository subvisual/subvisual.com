const { createFilePath } = require("gatsby-source-filesystem")

const blogPostsConfig = require("./blog_posts")

const onCreateBlogPostNode = ({ actions, getNode, node }) => {
  const { fileAbsolutePath, frontmatter } = node

  // All blog posts are written in Markdown and processed with Remark, so their
  // type is 'MarkdownRemark'. If the node has any other type, then it is not
  // a blog post and should be ignored.
  if (node.internal.type !== "MarkdownRemark") return

  // All blog posts are generated under the same path. If the node is in any
  // other place, then it is not a blog post and should be ignored.
  if (!fileAbsolutePath.startsWith(blogPostsConfig.absolutePath)) return

  const { createNodeField } = actions
  const generatedPath = createFilePath({
    basePath: blogPostsConfig.relativePath,
    getNode,
    node,
  })

  if (frontmatter.path !== generatedPath) {
    /* eslint-disable no-console */
    console.warn(`
      Warning:
        File at ${fileAbsolutePath} will generate a page at ${generatedPath},
        but the path in its frontmatter is ${frontmatter.path}
    `)
    /* eslint-enable no-console */
  }

  createNodeField({
    getNode,
    node,
    name: "slug",
    value: generatedPath,
  })
}

module.exports = ({ actions, getNode, node }) => {
  onCreateBlogPostNode({ actions, getNode, node })
}
