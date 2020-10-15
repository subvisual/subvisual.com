import React, { useEffect, useState } from "react"

function Loading({ waiting }) {
  if (!waiting) return null

  return <span>...</span>
}

function Search({ onChange, waiting }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  if (!ready) return null

  return (
    <form>
      <input type="text" onChange={(evt) => onChange(evt.target.value)} />
      <Loading waiting={waiting} />
    </form>
  )
}

export default Search
