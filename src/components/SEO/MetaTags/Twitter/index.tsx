import React from "react"
import Helmet from "react-helmet"

import { Component } from "./types"

const Twitter : Component = ({ creator, description, image, title, url }) => (
  <Helmet>
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content={creator} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:title" content={title} />
    <meta property="twitter:image" content={image} />
    <meta property="twitter:url" content={url} />
  </Helmet>
)

export default Twitter
