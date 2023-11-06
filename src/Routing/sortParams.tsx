import { useParams } from 'react-router-dom'
import { MediaSort } from '../gqlTypes.g'
import { useSearchContext } from '../Search/hooks/SearchContext'

export const SortParams = (): MediaSort.TrendingDesc | MediaSort.PopularityDesc | undefined => {
  const { sort } = useParams()
  const { operations: { setYear, setSeason } } = useSearchContext()
  if (sort === 'trending') {
    return MediaSort.TrendingDesc
  }
  if (sort === 'this-season') {
    setYear('2023')
    setSeason('FALL')
    return MediaSort.PopularityDesc
  }
  if (sort === 'next-season') {
    setYear('2024')
    setSeason('WINTER')
    return MediaSort.PopularityDesc
  }
  if (sort === 'all-time-popular') {
    return MediaSort.PopularityDesc
  }
}
