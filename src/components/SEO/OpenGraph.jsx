import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

const OpenGraph = ({ description, image, title, url }) => (
  <Helmet>
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:title" content={title} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={url} />
  </Helmet>
)

OpenGraph.propTypes = {
  description: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
}

export default OpenGraph
