import React, { useState } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import Observer from "@researchgate/react-intersection-observer"

import useDetectJavascript from "../../common/useDetectJavascript"

import "./index.module.css"

export default function LoadPlaceholder({ delay = 0, dark, children }) {
  const [loaded, setLoaded] = useState("")
  const [visible, setVisible] = useState(false)
  const hasJavascript = useDetectJavascript()
  const loadedStyle = loaded ? "loaded" : ""
  const darkStyle = dark ? "dark" : ""

  const onLoad = () => setLoaded(true)

  const handleChange = ({ isIntersecting }, unobserve) => {
    if (!isIntersecting) return

    unobserve()
    setVisible(true)
  }

  return (
    <>
      <noscript
        dangerouslySetInnerHTML={{
          __html: renderToStaticMarkup(children(onLoad)).replace(
            /noscript/g,
            "div"
          ),
        }}
      />
      {hasJavascript ? (
        <Observer onChange={handleChange}>
          <div styleName="root">
            <div
              style={{ transitionDelay: `${delay}s` }}
              styleName={`placeholder ${darkStyle} ${
                visible ? loadedStyle : ""
              }`}
            />
            {children(onLoad)}
          </div>
        </Observer>
      ) : null}
    </>
  )
}
