import React from "react"
import Helmet from "react-helmet"

import Keywords from "./Keywords"
import OpenGraph from "./OpenGraph"
import Twitter from "./Twitter"
import { Component } from "./types"

const MetaTags : Component = ({
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

export default MetaTags
