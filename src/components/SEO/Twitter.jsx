import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

const Twitter = ({ creator, description, image, title, url }) => (
  <Helmet>
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content={creator} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:title" content={title} />
    <meta property="twitter:image" content={image} />
    <meta property="twitter:url" content={url} />
  </Helmet>
)

Twitter.propTypes = {
  creator: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
}

export default Twitter
