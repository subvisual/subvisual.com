module.exports = [
  {
    resolve: "gatsby-plugin-local-search",
    options: {
      name: "posts",
      engine: "flexsearch",
      query: `
        {
          allMarkdownRemark {
            nodes {
              id
              frontmatter {
                path
                intro
                title
              }
            }
          }
        }
      `,
      index: ["title", "intro"],
      store: ["id"],
      normalizer: ({ data }) =>
        data.allMarkdownRemark.nodes.map((node) => ({
          id: node.id,
          intro: node.frontmatter.intro,
          title: node.frontmatter.title,
        })),
    },
  },
]
