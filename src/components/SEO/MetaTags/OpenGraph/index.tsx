import React from "react"
import Helmet from "react-helmet"

import { Component } from "./types"

const OpenGraph: Component = ({ description, image, title, url }) => (
  <Helmet>
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:image:secure_url" content={image} />
    <meta property="og:title" content={title} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={url} />
  </Helmet>
)

export default OpenGraph
