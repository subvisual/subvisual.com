import { useEffect, useState } from "react"

import createSearchWorker from "~/src/workers/search.worker.js"

const searchWorker = createSearchWorker()

export default (query, index, store) => {
  const [matches, setMatches] = useState()
  const [ready, setReady] = useState(false)
  const [waiting, setWaiting] = useState(false)

  useEffect(() => {
    setWaiting(true)
  }, [query])

  useEffect(() => {
    setReady(false)
    searchWorker.initialize(index, store).then(() => setReady(true))
  }, [index, store])

  useEffect(() => {
    if (!ready) return

    searchWorker.search(query).then((newMatches) => {
      setWaiting(false)
      setMatches(newMatches)
    })
  }, [query, ready])

  return [matches, waiting]
}
