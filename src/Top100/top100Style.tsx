import styled from 'styled-components'

export const BestAnimeSection = styled.section`

  margin-left: 220px;

  width: 1080px;  
`

export const AnimeTopSection = styled.section`
//position: absolute;  

 
  // margin-left: 220px;
  // margin-right: 220px;
  padding-top: 30px;
  margin-bottom: -5px;

  display: flex;
  justify-content: space-between;

`
export const AnimeTopConteiner = styled.section`
  // height: 55px;
  width : 1015px;

  padding-right: 10px;
  
  font-weight: 600;
  line-height: 10px;
  font-size: 15px;

  background-color: white;

  color: #808080;

  box-shadow: 0 5px 45px rgba(0, 0, 150, 0.2);

  border-radius: 5px;

  display: flex;
  
`

export const AnimeTopImage = styled.img`
  width: 47px;
  height: 62px;
  padding: 9px;

  cursor: pointer;

  border-radius: 5px;
`

export const AnimeTopTitleStyle = styled.a < { hoverColor: string | null | undefined } >`

  font-weight: 600;
  line-height: 10px;

  color: #647380;

  margin-bottom: 10px;
  padding-bottom: 5px;

  white-space: nowrap;
  
  overflow: hidden;
  text-overflow: ellipsis;

  cursor: pointer;

  display: block;

  &:hover {
    color: ${props => props.hoverColor};
    transition: 0.4s;
  }
`

export const AnimeTopGenreAndTitle = styled.section`
  width : 500px;

  margin-top:18px;
  margin-left: 10px;

  display: block;
`

export const GenreStyle = styled.a < { genreColor: string | null | undefined } >`

  weight: auto;
  height: 15px;

  padding: 0px 10px 5px 10px;

  margin-right: 10px;

  background-color: ${props => props.genreColor};
    color:white;
    //color: ${props => props.genreColor};

  border-radius: 20px;

  font-weight: 600;
  font-size: 11px;

  align-text: center;
  text-decoration: none;
  
  display: inline;
`
export const TitleStatsConteiner = styled.section`
  text-transform: lowercase;
  ::first-letter {
    text-transform: uppercase;
  }
  
  align-items: center;

  display: flex;
  justify-content: space-between
`
export const TypeSeasonAndFeedbackSection = styled.section`
  align-items: center;

  padding-right: 50px;
  
`

export const TypeSeasonAndFeedbackText = styled.span`
  
  color: #8BA0B2;

  font-weight: 600;
  font-size: 13px;
`

export const TitleStatsTextStyle = styled.div`

  margin-bottom: 10px;

  color: #647380;

  font-weight: 600;
  font-size: 14px;

`
