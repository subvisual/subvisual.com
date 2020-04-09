export const isLinux = ({ os: { name } }) => name === "Linux"
export const isMacOS = ({ os: { name } }) => name === "Mac OS"

export const isChrome = ({ browser: { name } }) => name === "Chrome"
export const isEdge = ({ browser: { name } }) => name === "Edge"
export const isSafari = ({ browser: { name } }) => name === "Safari"

export default { isLinux, isSafari }
