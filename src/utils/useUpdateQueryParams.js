import { useEffect } from "react"
import { isArray, isEmpty, isString } from "lodash"

export default function useUpdateQueryParams({ name, value, disabled }) {
  useEffect(() => {
    if (disabled) return

    const urlSearchParams = new URLSearchParams(window.location.search)

    if (isArray(value) && isEmpty(value)) urlSearchParams.delete(name)
    else if (isString(value) && isEmpty(value)) urlSearchParams.delete(name)
    else {
      const serializedValue = isArray(value)
        ? value.join(",")
        : value.toString()

      urlSearchParams.set(name, serializedValue)
    }

    const newRelativePathQuery = `${
      window.location.pathname
    }?${urlSearchParams.toString()}`

    history.pushState(null, "", newRelativePathQuery)
  }, [name, value])
}
