export interface Props {
  readonly keywords?: ReadonlyArray<string>
}

export interface Component {
  (props: Props): JSX.Element | null
}
