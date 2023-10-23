import React, {
  createContext,
  type Dispatch,
  type FC,
  type ReactNode, type SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'
import { type MediaSeason } from '../../gqlTypes.g'
import { useSearchParams } from 'react-router-dom'

interface ISearchContext {
  data: {
    genres: string[]
    tags: string[]
    search: string
    year: string
    season: MediaSeason | undefined
  }
  operations: {
    setSeason: Dispatch<SetStateAction<MediaSeason | undefined>>
    clearSeason: () => void

    setTags: Dispatch<SetStateAction<string[]>>
    setGenres: Dispatch<SetStateAction<string[]>>
    clearGenresAndTags: () => void

    setYear: Dispatch<SetStateAction<string>>
    clearYear: () => void

    setSearch: Dispatch<SetStateAction<string>>
    clearSearch: () => void

    addSearchUrl: () => void
    addGenreUrl: () => void
    addTagUrl: () => void
    clearUrl: () => void
  }
}

const SearchContext = createContext<ISearchContext | null>(null)
export const SearchContextWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const [genres, setGenres] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [search, setSearch] = useState<string>('')
  const [year, setYear] = useState<string>('')
  const [season, setSeason] = useState<MediaSeason | undefined>(undefined)
  const [searchParams, setSearchParams] = useSearchParams()

  const clearSeason = useCallback((): void => {
    setSeason(undefined)
  }, [])
  const clearSearch = useCallback((): void => {
    setSearch('')
  }, [])
  const clearGenresAndTags = useCallback((): void => {
    setGenres([])
    setTags([])
  }, [])
  const clearYear = useCallback((): void => {
    setYear('')
  }, [])

  const addSearchUrl = useCallback((): void => {
    if (search.length === 0) {
      setSearchParams(undefined)
    }
    searchParams.set('search', search)
    setSearchParams(searchParams)
  }, [search, searchParams, setSearchParams])

  const addGenreUrl = useCallback((): void => {
    searchParams.set('genre', genres)
    setSearchParams(searchParams)
  }, [genres, setSearchParams, searchParams])

  const addTagUrl = useCallback((): void => {
    searchParams.set('tag', tags)
    setSearchParams(searchParams)
  }, [tags, setSearchParams, searchParams])

  const clearUrl = useCallback((): void => {
    setSearchParams(undefined)
  }, [setSearchParams])

  const context: ISearchContext = useMemo(() => ({
    data: {
      genres,
      tags,
      search,
      season,
      year
    },
    operations: {
      clearSearch,
      setSearch,

      clearYear,
      setYear,

      clearGenresAndTags,
      setGenres,
      setTags,

      clearSeason,
      setSeason,
      addSearchUrl,
      addGenreUrl,
      addTagUrl,
      clearUrl
    }
  }), [genres, tags, search, season, year, clearSearch, clearYear, clearGenresAndTags, clearSeason, clearUrl, addSearchUrl, addGenreUrl, addTagUrl])

  return (
      <SearchContext.Provider value={context}>
        {children}
      </SearchContext.Provider>
  )
}

export const useSearchContext = (): ISearchContext => {
  const value = useContext(SearchContext)
  if (value === null) {
    throw new Error('empty SearchContext')
  }

  return value
}
