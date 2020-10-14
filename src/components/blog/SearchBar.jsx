import React from "react"

function Loading({ waiting }) {
  if (!waiting) return null

  return <span>...</span>
}

function Search({ onChange, waiting }) {
  return (
    <form>
      <input type="text" onChange={(evt) => onChange(evt.target.value)} />
      <Loading waiting={waiting} />
    </form>
  )
}

export default Search
