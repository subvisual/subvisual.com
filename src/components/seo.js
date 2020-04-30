import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { StaticQuery, graphql } from "gatsby"

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        description
        image
        title
        twitterUsername
        url
      }
    }
  }
`

function SEO({ description, lang, keywords, title }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={(data) => {
        const metaDescription =
          description || data.site.siteMetadata.description
        const metaImage = `${data.site.siteMetadata.url}${data.site.siteMetadata.image}`
        const metaTitle = title
          ? `${data.site.siteMetadata.title} | ${title}`
          : data.site.siteMetadata.title

        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={metaTitle}
          >
            <meta name="title" content={metaTitle} />
            <meta name="description" content={metaDescription} />

            <meta property="og:type" content="website" />
            <meta property="og:url" content={data.site.siteMetadata.url} />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={data.site.siteMetadata.url} />
            <meta
              name="twitter:creator"
              content={data.site.siteMetadata.twitterUsername}
            />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta property="twitter:image" content={metaImage} />

            {keywords.length > 0 ? (
              <meta name="keywords" content={keywords.join(`, `)} />
            ) : null}
          </Helmet>
        )
      }}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  keywords: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
}

export default SEO
