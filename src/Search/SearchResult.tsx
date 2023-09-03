import { AnimeComponentStyle, AnimeImage, AnimeSection, AnimeTitleStyle } from '../TrendingNow/animeComponentTrendingNow'
import React, { type JSX } from 'react'
import { useTop100Query } from '../anilist.g'

export const SearchResult = ({ foundByName, genreOrTag }: any): JSX.Element => {
  const { isLoading, error, data } = useTop100Query({
    endpoint: 'https://graphql.anilist.co',
    fetchParams: { headers: { 'content-type': 'application/json' } }
  })
  if (isLoading) return <>Loading...</>
  if (error) return <>An error has occurred: {(error as Error).message}</>

  const titleListsBasedOnName = data?.Page?.media?.filter(mediaAnime =>
    mediaAnime?.title?.romaji?.slice(0, foundByName.length) === foundByName)
  const titleListBasedOnGenre = titleListsBasedOnName?.filter(mediaAnime =>
    mediaAnime?.genres?.some(genre => genre === genreOrTag))

  return <><AnimeSection>
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
            {genreOrTag !== ''
              ? <></>
              : foundByName === ''
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
