const shouldAnimateEntrance = () => {
  const currentTime = new Date().getTime()

  if (!window.localStorage.getItem("visited")) {
    window.localStorage.setItem("visited", currentTime.toString())

    return true
  }

  const visitedTime = Number(window.localStorage.getItem("visited"))
  const ONE_DAY = 24 * 60 * 60 * 1000

  if (
    window.localStorage.getItem("visited") &&
    currentTime - visitedTime < ONE_DAY
  ) {
    return false
  }

  window.localStorage.setItem("visited", currentTime.toString())

  return true
}

export { shouldAnimateEntrance }
