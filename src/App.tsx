import React, {JSX, ReactNode} from 'react';
import logo from './logo.svg';
import './App.css';
import {QueryClient, useQuery, QueryClientProvider} from "@tanstack/react-query";



const queryClient = new QueryClient()

function App() {
  return <>
     <QueryClientProvider client={queryClient}>
         <Example/>
     </QueryClientProvider>
  </>
}

export default App;

export function Example() {
    const { isLoading, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
            fetch('https://api.github.com/repos/tannerlinsley/react-query').then(
                (res) => res.json(),
            ),
    })

    if (isLoading) return <>Loading...</>

    if (error) return <>An error has occurred: {(error as Error).message}</>

    return (
        <div>
            <h1>{data.name}</h1>
            <p>{data.description}</p>
            <strong>👀 {data.subscribers_count}</strong>{' '}
            <strong>✨ {data.stargazers_count}</strong>{' '}
            <strong>🍴 {data.forks_count}</strong>
        </div>
    )
}

