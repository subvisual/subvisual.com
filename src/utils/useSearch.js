import { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { useFlexSearch } from "react-use-flexsearch"

export default () => {
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

  const [query, setQuery] = useState()
  const results = useFlexSearch(query, index, store)

  return [results, query, setQuery]
}
