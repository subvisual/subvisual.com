module.exports = () => [
  {
    resolve: "gatsby-plugin-feed",
    options: {
      feeds: [
        {
          match: "^/blog/",
          output: "/blog/rss.xml",
          query: `
            {
              allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] },
              ) {
                nodes {
                  fields {
                    slug
                  },
                  frontmatter {
                    date
                    intro
                    title
                  }
                }
              }
            }
          `,
          serialize: ({ query: { allMarkdownRemark } }) =>
            allMarkdownRemark.nodes.map(({ fields, frontmatter }) => ({
              date: frontmatter.date,
              description: frontmatter.intro,
              guid: fields.slug,
              title: frontmatter.title,
              url: fields.slug,
            })),
        },
      ],
    },
  },
]
