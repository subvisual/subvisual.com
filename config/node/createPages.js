const path = require("path")

const ROOT = path.resolve(__dirname, "../..")

const createAuthorPages = async ({ createPage, graphql }) => {
  const component = path.resolve(ROOT, "src/templates/Author/index.jsx")

  const query = `
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/src\\/posts/" } }
      ) {
        distinct(field: {frontmatter: {author: {key: SELECT}}})
      }
    }
  `
  const results = await graphql(query)

  results.data.allMarkdownRemark.distinct.forEach((authorKey) =>
    createPage({
      component,
      context: { authorKey },
      path: path.posix.join("/blog/author", authorKey),
    })
  )
}

const createBlogPostPages = async ({ createPage, graphql }) => {
  const component = path.resolve(ROOT, "src/templates/Post/index.jsx")

  const query = `
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/src\\/posts/" } }
      ) {
        nodes {
          fields {
            cover
            seoImage
            path
          }
          frontmatter {
            path
            title
          }
        }
      }
    }
  `
  const results = await graphql(query)

  results.data.allMarkdownRemark.nodes.forEach((node) => {
    const { fields, frontmatter } = node
    const { cover, seoImage, path: postPath } = fields
    const { path: slug, title } = frontmatter

    createPage({
      component,
      context: {
        cover,
        seoImage: seoImage || cover,
        slug,
        title,
        isBlogPost: true,
      },
      path: postPath,
    })
  })
}

const createTagPages = async ({ createPage, graphql }) => {
  const component = path.resolve(ROOT, "src/templates/Tags/index.jsx")

  const query = `
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/src\\/posts/" } }
      ) {
        distinct(field: {frontmatter: {tags: {key: SELECT}}})
      }
    }
  `
  const results = await graphql(query)

  results.data.allMarkdownRemark.distinct.forEach((tagKey) =>
    createPage({
      component,
      context: { tagKey },
      path: path.posix.join("/tags/", tagKey),
    })
  )
}

module.exports = async ({ actions, graphql }) => {
  const { createPage } = actions

  await createAuthorPages({ createPage, graphql })
  await createBlogPostPages({ createPage, graphql })
  await createTagPages({ createPage, graphql })
}
