export interface Props {
  readonly description?: string,
  readonly image?: string,
  readonly title?: string,
  readonly url?: string,
}

export interface Component {
  (props: Props): JSX.Element
}
