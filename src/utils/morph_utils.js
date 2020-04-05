export function withMorphStyle(morph, otherStyle) {
  const { style, ...restOfMorph } = morph
  const blendedStyle = { ...otherStyle, ...style }

  return [blendedStyle, restOfMorph]
}

export default { withMorphStyle }
