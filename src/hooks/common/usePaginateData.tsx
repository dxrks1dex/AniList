import { useEffect, useRef, useState } from 'react'
import { type TrendingNowQuery } from '../../anilist.g'

type Media = NonNullable<NonNullable<TrendingNowQuery['Page']>['media']>

interface pagDataProps {
  data: Media | undefined
  trendingOutput: Media

  currentPage: number
  prevPageRef: number | undefined

}

export const usePaginateData = ({ data, currentPage }: pagDataProps): Media => {
  const [trendingOutput, setTrendingOutput] = useState<Media>([])

  const currentPageRef = useRef(currentPage)
  currentPageRef.current = currentPage

  const prevPageRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const prevPage = prevPageRef.current

    if (prevPage !== undefined && prevPage >= currentPageRef.current) {
      setTrendingOutput(data ?? [])
    } else
    if (data !== undefined) {
      setTrendingOutput(trendingOutput => ([...trendingOutput, ...(data ?? [])]))
      prevPageRef.current = currentPageRef.current
    }
  }, [data])

  return trendingOutput
}
