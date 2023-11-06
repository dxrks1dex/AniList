import React from 'react'
import { Link } from 'react-router-dom'
import { AnimeComponentStyle, AnimeImage, AnimeTitleStyle } from '../TrendingNow/animeComponentTrendingNow'

type Props = {
  id: number
  coverImage?: {
    color?: string | null
    extraLarge?: string | null
  } | null
  title?: {
    romaji?: string | null
  } | null
}

export function AnimeCard ({ id, coverImage, title }: Props): JSX.Element {
  return <Link to={`/anime/${id}/${title?.romaji ?? ''}/`}><AnimeComponentStyle hoverColor={coverImage?.color}>
    {coverImage?.extraLarge && <AnimeImage src = {coverImage.extraLarge}/>}
    <div style={{ cursor: 'pointer' }}>
      <AnimeTitleStyle>
        {title?.romaji}
      </AnimeTitleStyle>
    </div>
  </AnimeComponentStyle></Link>
}
