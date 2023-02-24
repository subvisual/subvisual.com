module.exports = () => [
  {
    resolve: "gatsby-plugin-feed",
    options: {
      feeds: [
        {
          match: "^/blog/",
          output: "/blog/rss.xml",
          title: "Subvisual",
          query: `
            {
              allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] },
              ) {
                nodes {
                  fields {
                   url
                  },
                  frontmatter {
                    author {
                      email
                      name
                    }
                    date
                    intro
                    title
                  }
                }
              }
            }
          `,
          serialize: ({ query: { allMarkdownRemark } }) =>
            allMarkdownRemark.nodes.map(({ fields, frontmatter }) => {
              const { url } = fields
              const { author, date, intro, title } = frontmatter
              const authorEmail = author.email || "contact@subvisual.com"

              return {
                custom_elements: [
                  {
                    author: `${authorEmail} (${author.name})`,
                  },
                ],
                date,
                description: intro,
                guid: url,
                title,
                url: url,
              }
            }),
        },
      ],
    },
  },
]
