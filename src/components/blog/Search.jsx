import React from "react"

function Search({ onChange }) {
  return (
    <form>
      <input type="text" onChange={(evt) => onChange(evt.target.value)} />
    </form>
  )
}

export default Search
