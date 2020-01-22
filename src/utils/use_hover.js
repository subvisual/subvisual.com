import React from "react"

export default function useHover() {
  const [value, setValue] = React.useState(false)
  const ref = React.useRef(null)

  const handleMouseOver = () => setValue(true)
  const handleMouseOut = () => setValue(false)
  const setHoverRef = node => {
    ref.current = node
  }

  React.useEffect(() => {
    const node = ref.current

    if (node && node.addEventListener) {
      node.addEventListener("mouseover", handleMouseOver)
      node.addEventListener("mouseout", handleMouseOut)

      return () => {
        node.removeEventListener("mouseover", handleMouseOver)
        node.removeEventListener("mouseout", handleMouseOut)
      }
    }
  }, [ref.current])

  return [setHoverRef, value]
}
