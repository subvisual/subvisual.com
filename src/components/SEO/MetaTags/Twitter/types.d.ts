export interface Props {
  readonly creator?: string
  readonly description?: string
  readonly image?: string
  readonly title?: string
  readonly url?: string
}

export interface Component {
  (props: Props): JSX.Element
}
