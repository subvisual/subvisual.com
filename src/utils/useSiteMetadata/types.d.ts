export interface TwitterMetadata {
  creator: string
}

export interface SiteMetadata {
  description: string
  image: string
  lang: string
  siteUrl: string
  title: string
  twitter: TwitterMetadata
}
