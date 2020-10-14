import FlexSearch from "flexsearch"

let index
let store

/** Initialize a FlexSearch index from its string representation.
 */
export async function initialize(providedIndex, providedStore) {
  index = FlexSearch.create()
  index.import(providedIndex)

  store = providedStore
}

/** Apply a query on a FlexSearch index and store.
 */
export async function search(query) {
  if (!query || !index || !store) return undefined

  return index.search(query).map((id) => store[id])
}
