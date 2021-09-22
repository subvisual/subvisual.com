const path = require("path")

const ROOT = path.resolve(__dirname, "../..")

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
  {
    resolve: "gatsby-plugin-google-gtag",
    options: {
      trackingIds: ["UA-63400449-1"],
      gtagConfig: {
        anonymize_ip: true,
        client_storage: "none",
        // Set GTag cookies as session cookies, will go away when the current
        // browser session ends.
        cookie_expires: 0,
      },
      pluginConfig: {
        head: false,
        respectDNT: true,
      },
    },
  },
  "gatsby-plugin-twitter",
  {
    resolve: "gatsby-plugin-netlify-cache",
    options: {
      cachePublic: true,
    },
  },
  `gatsby-plugin-netlify-cms`,
]
