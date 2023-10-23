import { type JSX } from 'react'
import { useRouteError } from 'react-router-dom'

interface Error {
  message: string
  statusText: string
  error: string
}

export const NotFoundPage = (): JSX.Element => {
  const error = useRouteError() as Error
  return <>
      <div>Page not found</div>
      <div>{error.statusText ?? error.message}</div>
  </>
}
