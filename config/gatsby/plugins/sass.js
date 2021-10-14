const path = require("path")
const postCssUrl = require("postcss-url")
const sass = require("sass")

module.exports = (root) => [
  {
    resolve: "gatsby-plugin-sass",
    options: {
      implementation: sass,
      cssLoaderOptions: {
        //esModule: false,
        //localIdentName: "[folder]-[name]--[local]--[hash:base64:5]",
        //modules: {
          //namedExport: false,
        //},
      },
      sassOptions: {
        includePaths: [
          path.resolve(root, "node_modules"),
          path.resolve(root, "src"),
        ],
      },
      postCssPlugins: [
        postCssUrl([
          {
            filter: "**/fonts/inline/*",
            url: "inline",
          },
        ]),
      ],
    },
  },
]
