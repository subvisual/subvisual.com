import { graphql, useStaticQuery } from "gatsby"
import { useFlexSearch } from "react-use-flexsearch"

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
  const matches = useFlexSearch(query, index, store)

  if (!query) return posts

  // Map the matches to the provided posts
  return matches.map(({ id }) => posts.find((post) => post.id === id))
}
