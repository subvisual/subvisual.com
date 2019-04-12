import React from "react"
import PropTypes from "prop-types"

import PageTitle from "../../PageTitle"
import Planet from "../../Planet"
import useDetectJavascript from "../../../common/useDetectJavascript"

import "./Title.module.css"

const Title = ({ planetMorph }) => {
  const hasJavascript = useDetectJavascript()

  if (hasJavascript) {
    return (
      <PageTitle>
        We nurture{" "}
        <span styleName="ideas">
          ideas
          <span styleName="planet">
            <Planet morph={planetMorph} codeName="heroTittle" color="blue" />
          </span>
        </span>{" "}
        <span styleName="glue">that empower</span> people
      </PageTitle>
    )
  }

  return (
    <PageTitle regularFont>
      We nurture <span styleName="ideas">ideas</span>{" "}
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
