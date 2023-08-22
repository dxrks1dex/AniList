import React, { type JSX, useState } from 'react'
import { useTop100Query } from '../anilist.g'
import { SearchBar, SearchButton, SearchInput, SearchSection } from './searchStyle'
import { AnimeComponentStyle, AnimeImage, AnimeSection, AnimeTitleStyle } from '../TrendingNow/animeComponentTrendingNow'

export const SearchByName = ({ genreOrTag }: any): JSX.Element => {
  const [foundByName, setFoundByName] = useState('')

  const { isLoading, error, data } = useTop100Query({
    endpoint: 'https://graphql.anilist.co',
    fetchParams: { headers: { 'content-type': 'application/json' } }
  })
  if (isLoading) return <>Loading...</>
  if (error) return <>An error has occurred: {(error as Error).message}</>

  const titleListsBasedOnName = data?.Page?.media?.filter(name => name?.title?.romaji?.slice(0, foundByName.length) === foundByName)
  const titleListBasedOnGenre = data?.Page?.media?.filter(genres =>
    genres?.genres?.map(genre => genre?.slice(0, genreOrTag.length)) === genreOrTag)

  return <><SearchBar>
        Search
        <SearchSection>
            <SearchInput value={foundByName} onChange={(e: any): any => { setFoundByName(e.target.value) }}/>
            {foundByName !== ''
              ? <SearchButton onClick={(e: any) => { setFoundByName(''); e.preventDefault() }}>X</SearchButton>
              : null}
        </SearchSection>
    </SearchBar>
    <AnimeSection>
        {genreOrTag === ''
          ? <></>
          : titleListBasedOnGenre?.map((titleGenre) => <>
                <AnimeComponentStyle color={titleGenre?.coverImage?.color}>
                    <AnimeImage src = {titleGenre?.coverImage?.medium}/>
                    <div style={{ cursor: 'pointer' }}>
                        <AnimeTitleStyle>
                            {titleGenre?.title?.romaji}
                        </AnimeTitleStyle>
                    </div>
                </AnimeComponentStyle>
            </>)

        }
        {foundByName === ''
          ? <></>
          : titleListsBasedOnName?.map((item) => <>
                    <AnimeComponentStyle color={item?.coverImage?.color}>
                        <AnimeImage src = {item?.coverImage?.medium}/>
                        <div style={{ cursor: 'pointer' }}>
                            <AnimeTitleStyle>
                                {item?.title?.romaji}
                            </AnimeTitleStyle>
                        </div>
                    </AnimeComponentStyle>
                </>
          )}</AnimeSection></>
}
