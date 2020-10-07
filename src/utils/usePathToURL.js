import useSiteMetadata from "~/src/utils/useSiteMetadata"

export default (path) => {
  // If no path is provided, exit early
  if (!path) return undefined

  const { siteUrl } = useSiteMetadata()

  return new URL(path, siteUrl).toString()
}
