import { useContext } from 'react'
import { combineRules } from 'fela'

import { RendererContext, ThemeContext } from './context'

export default function useFela(props = {}) {
  const renderer = useContext(RendererContext)
  const theme = useContext(ThemeContext) || {}

  if (!renderer) {
    throw new Error(
      'The "useFela" hook can only be used  inside a "RendererProvider"'
    )
  }

  // we add the theme to props so that it can be used within styles
  props.theme = theme

  function css(...rules) {
    return renderer.renderRule(combineRules(...rules), props)
  }

  return {
    renderer,
    theme,
    css,
  }
}
