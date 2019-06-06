import React from "react"
import PropTypes from "prop-types"

import PageTitle from "../../PageTitle"
import Planet from "../../Planet"
import useDetectJavascript from "../../../common/useDetectJavascript"

import "./Title.module.css"

const Title = ({ planetMorph, hide }) => {
  const hasJavascript = useDetectJavascript()

  if (!hasJavascript)
    return (
      <PageTitle withTittle>
        We nurture <span styleName="ideas">ideas</span>{" "}
        <span styleName="glue">that empower</span> people
      </PageTitle>
    )

  return (
    <PageTitle>
      We nurture{" "}
      <span styleName="ideas">
        ideas
        <span styleName="planet">
          <Planet
            hovering={false}
            hide={hide}
            morph={planetMorph}
            codeName="heroTittle"
            color="blue"
          />
        </span>
      </span>{" "}
      <span styleName="glue">that empower</span> people
    </PageTitle>
  )
}

Title.propTypes = {
  planetMorph: PropTypes.func,
}

Title.defaultProps = {
  planetMorph: () => {},
}

export default Title
