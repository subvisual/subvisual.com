import React from "react"
import PropTypes from "prop-types"
import _defaults from "lodash/defaults"

import useSiteMetadata from "~/src/utils/useSiteMetadata"

import MetaTags from "./MetaTags"

const SEO = ({ description, image, lang, keywords, title, url }) => {
  // Gather the sitewide default metadata as fallback
  const siteMetadata = useSiteMetadata()

  const metadata = _defaults(
    {
      description,
      image,
      lang,
      keywords,
      title: [siteMetadata.title, title].join(" | "),
      url,
    },
    siteMetadata
  )

  return <MetaTags {...metadata} />
}

SEO.propTypes = {
  description: PropTypes.string,
  image: PropTypes.string,
  lang: PropTypes.string,
  title: PropTypes.string,
  twitter: PropTypes.object,
  url: PropTypes.string,
}

export default SEO
