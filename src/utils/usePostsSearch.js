import { graphql, useStaticQuery } from "gatsby"

import useSearch from "~/src/utils/useSearch"

export default (posts, query) => {
  const {
    localSearchPosts: { index, store },
  } = useStaticQuery(graphql`
    query {
      localSearchPosts {
        index
        store
      }
    }
  `)

  // Search the index for matches in the store
  const [matches, waiting] = useSearch(query, index, store)

  // Map the matches to the provided posts
  const matchingPosts = matches
    ? matches.map(({ id }) => posts.find((post) => post.id === id))
    : posts

  return [matchingPosts, waiting]
}
