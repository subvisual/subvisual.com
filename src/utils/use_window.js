import { useEffect, useState } from "react"

export default (callback) => {
  const [windowObject, setWindowObject] = useState()

  useEffect(() => {
    setWindowObject(window)

    if (typeof callback === "function") {
      callback(window)
    }
  }, [callback])

  return windowObject
}
