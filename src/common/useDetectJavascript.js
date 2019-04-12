import { useState, useLayoutEffect } from "react"

export default function useDetectJavascript() {
  const [hasJavascript, setJavascript] = useState(false)

  useLayoutEffect(() => {
    if (typeof window !== "undefined") setJavascript(true)
  }, [])

  return hasJavascript
}
