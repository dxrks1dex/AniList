import React, { type JSX } from 'react'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAnilistQuery } from './anilist.g'

const queryClient = new QueryClient()

function App (): JSX.Element {
  return <>
     <QueryClientProvider client={queryClient}>
         <Example/>
     </QueryClientProvider>
  </>
}

export default App

export function Example (): JSX.Element {
  const { isLoading, error, data } = useAnilistQuery({
    endpoint: 'https://graphql.anilist.co',
    fetchParams: { headers: { 'content-type': 'application/json' } }
  }, {
    id: 5
  })
  if (isLoading) return <>Loading...</>

  if (error) return <>An error has occurred: {(error as Error).message}</>

  return (
        <div>
            <h1>{data?.Media?.id}</h1>
            <p>{data?.Media?.title?.romaji}</p>
        </div>
  )
}
