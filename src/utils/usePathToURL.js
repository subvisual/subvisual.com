import useSiteMetadata from "~/src/utils/useSiteMetadata"

export default (path) => {
  // If no path is provided, exit early
  if (!path) return undefined

  const { url } = useSiteMetadata()

  return new URL(path, url).toString()
}
