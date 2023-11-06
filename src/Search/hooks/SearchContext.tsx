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
    currentPage: number
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

    setCurrentPage: Dispatch<React.SetStateAction<number>>
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
  const [currentPage, setCurrentPage] = useState<number>(1)

  const clearSeason = useCallback((): void => {
    setSeason(undefined)
    setCurrentPage(1)
  }, [])
  const clearSearch = useCallback((): void => {
    setSearch('')
    setCurrentPage(1)
  }, [])
  const clearGenresAndTags = useCallback((): void => {
    setGenres([])
    setTags([])
    setCurrentPage(1)
  }, [])
  const clearYear = useCallback((): void => {
    setYear('')
    setCurrentPage(1)
  }, [])

  const addSearchUrl = useCallback((): void => {
    if (search.length === 0) {
      setSearchParams(undefined)
    }
    searchParams.set('search', search)
    setSearchParams(searchParams)
    setCurrentPage(1)
  }, [search, searchParams, setSearchParams])

  const addGenreUrl = useCallback((): void => {
    searchParams.set('genre', genres)
    setSearchParams(searchParams)
    setCurrentPage(1)
  }, [genres, setSearchParams, searchParams])

  const addTagUrl = useCallback((): void => {
    searchParams.set('tag', tags)
    setSearchParams(searchParams)
    setCurrentPage(1)
  }, [tags, setSearchParams, searchParams])

  const clearUrl = useCallback((): void => {
    setSearchParams(undefined)
    setCurrentPage(1)
  }, [setSearchParams])

  const context: ISearchContext = useMemo(() => ({
    data: {
      genres,
      tags,
      search,
      season,
      year,
      currentPage
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
      clearUrl,

      setCurrentPage
    }
  }), [genres, tags, search, season, year, currentPage, clearSearch, clearYear, clearGenresAndTags, clearSeason, addSearchUrl, addGenreUrl, addTagUrl, clearUrl])

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
