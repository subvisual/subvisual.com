exports.createPages = require("./config/node/createPages")
exports.createSchemaCustomization = require("./config/node/createSchemaCustomization")
exports.onCreateNode = require("./config/node/onCreateNode")
exports.onPreInit = require("./config/node/onPreInit")

// set ignoreOrder to true in MiniCssExtractPlugin
exports.onCreateWebpackConfig = ({ actions, stage, getConfig, loaders }) => {
  if (stage === "build-javascript" || stage === "develop") {
    const config = getConfig()

    const index = config.plugins.findIndex(
      (plugin) => plugin.constructor.name === "MiniCssExtractPlugin"
    )

    if (index) config.plugins[index].options.ignoreOrder = true

    actions.replaceWebpackConfig(config)
  }
}
