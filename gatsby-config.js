const dotenv = require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const plugins = require("./config/gatsby/plugins")
const siteMetadata = require("./config/gatsby/siteMetadata")

module.exports = { plugins, siteMetadata }
