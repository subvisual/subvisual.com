module.exports = ({ actions, getConfig }) => {
  const config = getConfig()

  // Set output to a Node and browser compatible value for Web Workers
  //
  // This requires replacing the current config due to security limitations in
  // setWebpackConfig, which ignores changes to output.
  config.output.globalObject = "this"
  actions.replaceWebpackConfig(config)

  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.worker\.js$/,
          use: { loader: "workerize-loader" },
        },
      ],
    },
  })
}
