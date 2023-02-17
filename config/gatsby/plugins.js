const path = require("path")
const normalizePathForRegExp = require("@subvisual/utils/normalizePathForRegExp")

const ROOT = path.resolve(__dirname, "../..")
const BLOG_POSTS_ABSOLUTE_PATH = path.resolve(ROOT, "src/posts")
const siteUrl = process.env.URL || "http://localhost:8000"
const basePath = normalizePathForRegExp(BLOG_POSTS_ABSOLUTE_PATH)

const sassConfig = require("./plugins/sass")(ROOT)
const rssFeedConfig = require("./plugins/rssFeed")(ROOT)
const manifestConfig = require("./plugins/manifest")(ROOT)

module.exports = [
  ...sassConfig,
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
        "gatsby-remark-embedder",
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
        {
          resolve: `gatsby-remark-image-attributes`,
          options: {
            dataAttributes: true,
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
  "gatsby-plugin-sharp",
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
  `gatsby-plugin-netlify-cms`,
  {
    resolve: `gatsby-plugin-json-output`,
    options: {
      siteUrl,
      graphQLQuery: `
      {
        allMarkdownRemark(
          limit: 3,
          filter: { fileAbsolutePath: { regex: "/^${basePath}/" } }
          sort: {
            fields: [frontmatter___date, frontmatter___title]
            order: [DESC, DESC]
          }
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
