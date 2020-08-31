import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import Keywords from "./Keywords"
import OpenGraph from "./OpenGraph"
import Twitter from "./Twitter"

const MetaTags = ({
  description,
  image,
  lang,
  keywords,
  title,
  twitter,
  url,
}) => (
  <>
    <Helmet htmlAttributes={{ lang }} title={title}>
      <meta name="description" content={description} />
      <meta name="title" content={title} />
    </Helmet>
    <Keywords keywords={keywords} />
    <OpenGraph {...{ description, image, title, url }} />
    <Twitter {...{ description, image, title, url, ...twitter }} />
  </>
)

MetaTags.propTypes = {
  description: PropTypes.string,
  image: PropTypes.string,
  lang: PropTypes.string,
  title: PropTypes.string,
  twitter: PropTypes.object,
  url: PropTypes.string,
}

export default MetaTags
