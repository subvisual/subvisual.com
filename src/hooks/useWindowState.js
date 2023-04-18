import { useState, useEffect } from "react"
import useDetectJavascript from "~/src/utils/use_detect_javascript"

function useWindowState() {
  const hasJavascript = useDetectJavascript()

  const [scrollY, setScrollY] = useState(hasJavascript ? window.scrollY : 0)
  const [innerWidth, setInnerWidth] = useState(
    hasJavascript ? window.innerWidth : 0
  )

  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY)
    }

    function handleResize() {
      setInnerWidth(window.innerWidth)
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return { scrollY, innerWidth }
}

export default useWindowState
