import { useMemo } from "react"

export default function useURLParams() {
  const urlSearchParams = useMemo(() => {
    if (typeof window === "undefined") return

    // eslint-disable-next-line consistent-return
    return new URLSearchParams(window.location.search)
  }, [])

  if (!urlSearchParams) return {}

  return Object.fromEntries(urlSearchParams.entries())
}
