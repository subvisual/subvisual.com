const path = require("path")

module.exports = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        src: path.resolve(__dirname, "../../src"),
      },
    },
  })
}
