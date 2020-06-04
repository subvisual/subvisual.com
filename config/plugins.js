const path = require("path")
const postCssUrl = require("postcss-url")
const sass = require("sass")

const ROOT = path.resolve(__dirname, "..")

module.exports = [
  {
    resolve: "gatsby-plugin-sass",
    options: {
      implementation: sass,
      includePaths: [
        path.resolve(ROOT, "node_modules"),
        path.resolve(ROOT, "src"),
      ],
      postCssPlugins: [
        postCssUrl([{ filter: "**/fonts/inline/*", url: "inline" }]),
      ],
    },
  },
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
  "gatsby-plugin-sharp",
  {
    resolve: "gatsby-plugin-manifest",
    options: {
      name: "subvisual",
      short_name: "subvisual",
      start_url: "/",
      background_color: "#ffffff",
      theme_color: "#ffffff",
      display: "minimal-ui",
      icon: path.resolve(ROOT, "src/images/subvisual-symbol-blue.svg"),
    },
  },
  {
    resolve: "gatsby-plugin-react-svg",
    options: {
      rule: {
        include: /\.inline\.svg$/,
      },
    },
  },
  {
    resolve: "gatsby-plugin-google-analytics",
    options: {
      trackingId: "UA-63400449-1",
      head: false,
      anonymize: true,
      respectDNT: true,
    },
  },
  {
    resolve: "gatsby-plugin-netlify-cache",
    options: {
      cachePublic: true,
    },
  },
]
