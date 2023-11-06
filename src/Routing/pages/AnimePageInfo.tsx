import { type JSX } from 'react'

export const AnimePageInfoReturn = (info: string | null): JSX.Element | undefined => {
  if (info === null) {
    return <>Overviewed</>
  }
  if (info === 'staff') {
    return <>Staff</>
  }
  if (info === 'characters') {
    return <>characters</>
  }
  if (info === 'stats') {
    return <>stats</>
  }
  if (info === 'social') {
    return <>social</>
  }
}

// export const AnimePageInfo = (info: string | undefined): JSX.Element => {
//   const [searchParams, setSearchParams] = useSearchParams()
//
//   if (info === undefined) {
//     setSearchParams(undefined)
//   }
//   if (info === 'staff') {
//     searchParams.set('/', 'staff')
//     setSearchParams(searchParams)
//   }
//   if (info === 'characters') {
//     searchParams.set('/', 'characters')
//     setSearchParams(searchParams)
//   }
//   if (info === 'stats') {
//     searchParams.set('/', 'stats')
//     setSearchParams(searchParams)
//   }
//   if (info === 'social') {
//     searchParams.set('/', 'social')
//     setSearchParams(searchParams)
//   }
//   return <>{searchParams.get('/') ? <></> : <></>}</>
// }
