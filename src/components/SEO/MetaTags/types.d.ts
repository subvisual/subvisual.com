export interface Props {
  description?: string
  image?: string
  lang?: string
  keywords?: ReadonlyArray<string>
  title?: string
  twitter?: object
  url?: string
}

export interface Component {
  (props: Props): JSX.Element
}
