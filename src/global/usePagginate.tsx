import { useEffect } from 'react'
import { useSearchContext } from '../Search/SearchContext'

export const usePagginate = (setTrendingOutput, data, currentPageRef, prevPageRef, setCurrentPage) => {
  const { data: { tags, season, year, genres, search } } = useSearchContext()
  useEffect(() => {
    const prevPage = prevPageRef.current

    if (prevPage !== undefined && prevPage >= currentPageRef.current) {
      setTrendingOutput(data?.Page?.media ?? [])
    } else
    if (data?.Page?.media !== undefined) {
      setTrendingOutput(trendingOutput => ([...trendingOutput, ...(data?.Page?.media ?? [])]))
      prevPageRef.current = currentPageRef.current
    }
  }, [data?.Page?.media])

  useEffect(() => {
    setCurrentPage(1)
  }, [genres, tags, search, year, season])
}
