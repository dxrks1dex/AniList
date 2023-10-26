import { useParams } from 'react-router-dom'
import { useMediaAnimeQuery } from '../../anilist.g'

type Params = {
  id: string
  name: string
}

export function AnimePage (): JSX.Element {
  const { id } = useParams<Params>()
  const { isLoading, data } = useMediaAnimeQuery({
    endpoint: 'https://graphql.anilist.co',
    fetchParams: { headers: { 'content-type': 'application/json' } }
  }, { id: Number(id) }, { enabled: !!id })

  if (!id) return <div>no id...</div>
  if (isLoading) return <div>Loading...</div>
  return <div>{JSON.stringify(data)}</div>
}
