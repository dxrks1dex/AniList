import { useSearchContext } from '../hooks/SearchContext'
import { SortParams } from '../../Routing/sortParams'
import { MediaSort } from '../../gqlTypes.g'

export const GetSearchParams = (currentPage: number): object => {
  const { data: { tags, season, year, genres, search } } = useSearchContext()

  return {
    sort: search === '' ? SortParams() : MediaSort.SearchMatch,
    page: currentPage,
    genre: genres.length === 0 ? undefined : genres,
    tag: tags.length === 0 ? undefined : tags,
    year: year === '' ? undefined : year + '%',
    season,
    search: search === '' ? undefined : search
  }
}
