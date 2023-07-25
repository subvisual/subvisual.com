const path = require("path")

const ROOT = path.resolve(__dirname, "../..")
const siteUrl = process.env.URL || "http://localhost:8000"

const sassConfig = require("./plugins/sass")(ROOT)
const rssFeedConfig = require("./plugins/rssFeed")(ROOT)
const manifestConfig = require("./plugins/manifest")(ROOT)

module.exports = [
  ...sassConfig,
  "gatsby-plugin-image",
  "gatsby-plugin-react-helmet",
  "gatsby-transformer-yaml",
  {
    resolve: "gatsby-source-filesystem",
    options: {
      path: path.resolve(ROOT, "src/data"),
    },
  },
  {
    resolve: "gatsby-source-filesystem",
    options: {
      path: path.resolve(ROOT, "src/documents"),
    },
  },
  {
    resolve: "gatsby-source-filesystem",
    options: {
      name: "images",
      path: path.resolve(ROOT, "src/images"),
    },
  },
  {
    resolve: "gatsby-source-filesystem",
    options: {
      path: path.resolve(ROOT, "src/posts"),
    },
  },
  {
    resolve: "gatsby-transformer-remark",
    options: {
      plugins: [
        "gatsby-remark-copy-linked-files",
        {
          resolve: "gatsby-remark-embed-video",
          options: {
            width: 980,
          },
        },
        {
          resolve: "gatsby-remark-images",
          options: {
            withWebp: true,
            maxWidth: 834,
            linkImagesToOriginal: false,
            quality: 85,
          },
        },
        "gatsby-remark-external-links",
        {
          resolve: "gatsby-remark-prismjs",
          options: {
            aliases: {
              sh: "bash",
              vimscript: "vim",
            },
          },
        },
        "gatsby-remark-responsive-iframe",
      ],
    },
  },
  "gatsby-transformer-sharp",
  {
    resolve: "gatsby-plugin-sharp",
    options: {
      defaults: {
        quality: 90,
      },
    },
  },
  {
    resolve: `gatsby-source-rss-feed`,
    options: {
      url: `https://feeds.simplecast.com/_7fv6zD4`,
      name: `CanIHaveItInBlue`,
    },
  },
  {
    resolve: `gatsby-source-rss-feed`,
    options: {
      url: `https://feeds.simplecast.com/26SKyPM6`,
      name: `TaGravar`,
    },
  },
  {
    resolve: `gatsby-source-rss-feed`,
    options: {
      url: `https://feeds.simplecast.com/M7Iqz4PG`,
      name: `ProductRocks`,
    },
  },
  ...manifestConfig,
  ...rssFeedConfig,
  {
    resolve: "gatsby-plugin-react-svg",
    options: {
      rule: {
        include: /\.inline\.svg$/,
      },
    },
  },
  "gatsby-plugin-twitter",
  "gatsby-plugin-netlify",
  {
    resolve: `gatsby-plugin-netlify-cms`,
    options: {
      modulePath: `${__dirname}/../../src/cms/cms.js`,
      enableIdentityWidget: false,
    },
  },
  {
    resolve: `gatsby-plugin-json-output`,
    options: {
      siteUrl,
      graphQLQuery: `
      {
        allMarkdownRemark(
          limit: 3,
          filter: { fileAbsolutePath: { regex: "/src\\/posts/" } }
          sort: [{ frontmatter: { date: DESC } }, { frontmatter: { title: DESC } }]
        ) {
          nodes {
            frontmatter {
              author {
                key
                name
              }
              date
              path
              title
              intro
            }
          }
        }
      }
      `,
      serializeFeed: (results) =>
        results.data.allMarkdownRemark.nodes.map(({ frontmatter }) => ({
          id: frontmatter.path,
          url: siteUrl + path.join("/blog", frontmatter.path),
          title: frontmatter.title,
          date: new Date(frontmatter.date).toISOString(),
          author: frontmatter.author.name,
        })),
      feedFilename: "blog/index",
      nodesPerFeedFile: 100,
    },
  },
  `seo-cover`,
]
