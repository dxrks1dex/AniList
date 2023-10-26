import React, { type JSX } from 'react'
import { AnimeComponentStyle, AnimeImage, AnimeTitleStyle } from '../../TrendingNow/animeComponentTrendingNow'

export const TitlePage = ({ titleImage, titleColor, titleName }): JSX.Element => {
  return <>
      <AnimeComponentStyle hoverColor={titleColor}>
          {titleImage && <AnimeImage src = {titleImage}/>}
          <div style={{ cursor: 'pointer' }}>
              <AnimeTitleStyle>
                  {titleName}
              </AnimeTitleStyle>
          </div>
      </AnimeComponentStyle>
  </>
}
