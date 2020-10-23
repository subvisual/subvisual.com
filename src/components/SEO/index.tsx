import React from "react"
import _defaults from "lodash/defaults"

import useSiteMetadata from "~/src/utils/useSiteMetadata"

import MetaTags from "./MetaTags"
import { Component } from "./types"

const buildTitle = (siteTitle: string, pageTitle?: string): string => {
  if (!pageTitle) return siteTitle

  return [siteTitle, pageTitle].join(" | ")
}

const SEO : Component = ({ description, image, lang, keywords, title, url }) => {
  // Gather the sitewide default metadata as fallback
  const siteMetadata = useSiteMetadata()

  const metadata = _defaults(
    {
      description,
      image,
      lang,
      keywords,
      title: buildTitle(siteMetadata.title, title),
      url,
    },
    siteMetadata,
    {
      url: siteMetadata.siteUrl,
    }
  )

  return <MetaTags {...metadata} />
}

export default SEO
