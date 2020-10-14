import { useEffect, useState } from "react"

import createSearchWorker from "~/src/workers/search.worker.js"

export default (query, index, store) => {
  const [matches, setMatches] = useState()
  const [ready, setReady] = useState(false)
  const [waiting, setWaiting] = useState(false)
  const [worker, setWorker] = useState()

  useEffect(() => {
    setWorker(createSearchWorker())
  }, [])

  useEffect(() => {
    setWaiting(true)
  }, [query])

  useEffect(() => {
    if (!worker) return

    setReady(false)
    worker.initialize(index, store).then(() => setReady(true))
  }, [worker, index, store])

  useEffect(() => {
    if (!worker || !ready) return

    worker.search(query).then((newMatches) => {
      setWaiting(false)
      setMatches(newMatches)
    })
  }, [worker, ready, query])

  console.log("QUERY", query)
  console.log("INDEX", index)
  console.log("STORE", store)
  console.log("READY", ready)
  console.log("WAITING", waiting)
  console.log("MATCHES", matches)

  return [matches, waiting]
}
