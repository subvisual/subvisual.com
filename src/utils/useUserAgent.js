import { useEffect, useState } from "react"
import UAParser from "ua-parser-js"

export default () => {
  const [userAgent, setUserAgent] = useState(UAParser())

  useEffect(() => {
    const parsed = UAParser(window.navigator.userAgent)

    setUserAgent(parsed)
  }, [])

  return userAgent
}
