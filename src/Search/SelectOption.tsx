import { type JSX } from 'react'
import { SelectOptionSection } from './genreOrTagStyleComponent'
import { type MediaSeason } from '../gqlTypes.g'

interface Props {
  value: string | undefined | MediaSeason | null
  onClick: () => void
  selected: boolean
}
export const SelectOption = ({ value, onClick, selected }: Props): JSX.Element => {
  return <SelectOptionSection onClick={onClick}>{value}{selected ? '✔' : null}</SelectOptionSection >
}
