import React from "react"
import Helmet from "react-helmet"

import { Component } from "./types"

const Keywords : Component = ({ keywords }) => {
  if (!keywords || keywords.length === 0) return null

  const content = keywords.join(`, `)

  return (
    <Helmet>
      <meta name="keywords" content={content} />
    </Helmet>
  )
}

export default Keywords
