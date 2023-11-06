import { useEffect, useRef, useState } from 'react'

type PagDataProps<T> = {
  data: T[] | null | undefined
  currentPage: number
}

export function usePaginateData<T> ({ data, currentPage }: PagDataProps<T>): T[] {
  const [trendingOutput, setTrendingOutput] = useState<T[]>([])

  const currentPageRef = useRef(currentPage)
  currentPageRef.current = currentPage

  const prevPageRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const prevPage = prevPageRef.current

    if (prevPage !== undefined && prevPage >= currentPageRef.current) {
      setTrendingOutput(data ?? [])
    } else if (data !== undefined) {
      setTrendingOutput(trendingOutput => ([...trendingOutput, ...(data ?? [])]))
    }
    prevPageRef.current = currentPageRef.current
  }, [data])

  return trendingOutput
}
