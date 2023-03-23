import { useState, useEffect } from "react"

function useWindowState() {
  const [scrollY, setScrollY] = useState(window.scrollY)
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)

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
