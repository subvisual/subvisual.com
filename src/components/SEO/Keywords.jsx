import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

const Keywords = ({ keywords }) => {
  if (!keywords || keywords.length === 0) return null

  const content = keywords.join(`, `)

  return (
    <Helmet>
      <meta name="keywords" content={content} />
    </Helmet>
  )
}

Keywords.propTypes = {
  keywords: PropTypes.arrayOf(PropTypes.string),
}

export default Keywords
