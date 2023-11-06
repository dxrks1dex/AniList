import {
  AnimeTopConteiner,
  AnimeTopGenreAndTitle,
  AnimeTopImage,
  AnimeTopSection,
  AnimeTopTitleStyle,
  Top100AnimeSection,
  GenreStyle,
  TitleStatsConteiner,
  TitleStatsTextStyle,
  TypeSeasonAndFeedbackSection,
  TypeSeasonAndFeedbackText
} from './top100Style'
import { ListName, ViewAll } from '../TrendingNow/animeComponentTrendingNow'
import React, { type JSX } from 'react'
import { useTop100Query } from '../anilist.g'

export const Top100Anime = (): JSX.Element => {
  const { isLoading, error, data } = useTop100Query({
    endpoint: 'https://graphql.anilist.co',
    fetchParams: { headers: { 'content-type': 'application/json' } }
  })
  if (isLoading) return <>Loading...</>
  if (error) return <>An error has occurred: {(error as Error).message}</>

  const top100 = data?.Page?.media
  const top100Slice = top100?.slice(0, 10)

  return <><ListName>TOP 100 ANIME <ViewAll>View All</ViewAll></ListName>
        <Top100AnimeSection>
            {top100Slice?.map((item, counter: number) => <>
                <AnimeTopSection>
                     <h2 style={{ color: '#8BA0B2' }}>#{counter + 1}</h2>
                    <AnimeTopConteiner>
                      {item?.coverImage?.medium && <AnimeTopImage src={item?.coverImage?.medium}/>}

                        <AnimeTopGenreAndTitle>

                            <AnimeTopTitleStyle hoverColor = {item?.coverImage?.color}>{item?.title?.romaji}</AnimeTopTitleStyle>
                            {item?.genres?.map(genres => <>
                                <GenreStyle href="#" genreColor = {item?.coverImage?.color} >{genres}</GenreStyle>
                            </>)}
                        </AnimeTopGenreAndTitle>
                        <TitleStatsConteiner>
                            <TypeSeasonAndFeedbackSection>
                                <TitleStatsTextStyle>{item?.meanScore}%</TitleStatsTextStyle>
                                <TypeSeasonAndFeedbackText>
                                  {item?.popularity} users
                                </TypeSeasonAndFeedbackText>
                            </TypeSeasonAndFeedbackSection>
                            <TypeSeasonAndFeedbackSection>
                                <TitleStatsTextStyle>
                                  {item?.format}{item?.format === 'MOVIE' ? null : ' Show'}
                                </TitleStatsTextStyle>
                                <TypeSeasonAndFeedbackText>
                                  {/* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */}
                                    {item?.episodes === 1 ? item?.duration : `${item?.episodes} episodes`}
                                </TypeSeasonAndFeedbackText>
                            </TypeSeasonAndFeedbackSection>
                            <TypeSeasonAndFeedbackSection>
                                <TitleStatsTextStyle>
                                    {item?.season}
                                </TitleStatsTextStyle>
                                <TypeSeasonAndFeedbackText>
                                    {item?.status}
                                </TypeSeasonAndFeedbackText>
                            </TypeSeasonAndFeedbackSection>
                        </TitleStatsConteiner>
                    </AnimeTopConteiner>
                </AnimeTopSection>
            </>)}
        </Top100AnimeSection>
    </>
}
