import React, { useState } from "react"
import PropTypes from "prop-types"

import Planet from "./Planet"

const Stage = ({ render }) => {
  const [anchors, setAnchors] = useState({})
  const { heroTittle } = anchors

  return (
    <>
      {render({
        heroTittleRef: (elem) => {
          if (elem === heroTittle) return

          setAnchors({ heroTittle: elem })
        },
      })}
      <Planet heroTittle={heroTittle} />
    </>
  )
}

Stage.propTypes = {
  render: PropTypes.func.isRequired,
}

export default Stage
