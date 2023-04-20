import { useState, useLayoutEffect } from "react"

export default function useDetectJavaScript() {
  const [hasJavaScript, setHasJavaScript] = useState(false)

  useLayoutEffect(() => setHasJavaScript(typeof window !== "undefined"), [])

  return hasJavaScript
}
