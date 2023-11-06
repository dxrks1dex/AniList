import { useParams, useSearchParams } from 'react-router-dom'
import { useMediaAnimeQuery } from '../../anilist.g'
import styled from 'styled-components'
import { AnimePageInfoReturn } from './AnimePageInfo'

type Params = {
  id: string
  name: string
}

export function AnimePage (): JSX.Element {
  const { id } = useParams<Params>()
  const [searchParams, setSearchParams] = useSearchParams()

  const { isLoading, data } = useMediaAnimeQuery({
    endpoint: 'https://graphql.anilist.co',
    fetchParams: { headers: { 'content-type': 'application/json' } }
  }, { id: Number(id) }, { enabled: !!id })

  if (!id) return <div>no id...</div>
  if (isLoading) return <div>Loading...</div>

  const AnimePageInfo = (info: string | null): string | null => {
    if (info === null) {
      setSearchParams(undefined)
    }
    if (info === 'staff') {
      searchParams.set('/', 'staff')
      setSearchParams(searchParams)
    }
    if (info === 'characters') {
      searchParams.set('/', 'characters')
      setSearchParams(searchParams)
    }
    if (info === 'stats') {
      searchParams.set('/', 'stats')
      setSearchParams(searchParams)
    }
    if (info === 'social') {
      searchParams.set('/', 'social')
      setSearchParams(searchParams)
    }
    return searchParams.get('/')
  }

  return <AnimePageGrid>
    <AnimePageHeader>
      <div>
        <BannerImage src={data?.Media?.bannerImage ?? ''} alt={''}/>
        <HeaderGrid>
          <AnimeImage src={data?.Media?.coverImage?.extraLarge ?? ''} alt={''}/>
          <DescriptionGrid>
            <HeaderTitle>{data?.Media?.title?.romaji}</HeaderTitle>
            <HeaderDescription dangerouslySetInnerHTML={{ __html: data?.Media?.description ?? '' }}>{null}</HeaderDescription>
          </DescriptionGrid>
          <NavBar>
            <StyledLink onClick={() => { AnimePageInfo(null) }}>Overview</StyledLink>
            <StyledLink onClick={() => { AnimePageInfo('characters') }}>Characters</StyledLink>
            <StyledLink onClick={() => { AnimePageInfo('staff') }}>Staff</StyledLink>
            <StyledLink onClick={() => { AnimePageInfo('stats') }}>Stats</StyledLink>
            <StyledLink onClick={() => { AnimePageInfo('social') }}>Social</StyledLink>
          </NavBar>
        </HeaderGrid>
      </div>
    </AnimePageHeader>
    <AnimePageContent>
    <LeftContent>
      <LeftContainer>
        Genres
        <LeftTextStyle>{data?.Media?.genres?.map(mediaGenre => <div key={mediaGenre}>{mediaGenre}</div>)}</LeftTextStyle>
        Episodes
        <div><LeftTextStyle>{data?.Media?.episodes}</LeftTextStyle></div>
      </LeftContainer>
      Tags
      <div>{data?.Media?.tags?.map(mediaTag =>
          <TagContainer key={mediaTag?.name}>{mediaTag?.name}<div>{mediaTag?.rank}%</div></TagContainer>)}
      </div>
    </LeftContent>
    <RightContent>
      {AnimePageInfoReturn(searchParams.get('/'))}
      <div>{data?.Media?.characters?.edges?.map(char => char?.name)}</div>
    </RightContent>
    </AnimePageContent>
  </AnimePageGrid>
}

const AnimePageGrid = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr; 
  grid-template-columns: 100%; 
  height: 100vh;
`

const AnimePageHeader = styled.div`
  background-color: #ccc;
  text-align: center;
`

const BannerImage = styled.img`
  width: 100%;
`
const HeaderDescription = styled.span`
  &:hover{
    color: #99adbf;
    transition: 0.2s;
  }
`
const HeaderTitle = styled.h1`
  color: #9FADBD;
`
const HeaderGrid = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 10% 70%;
  grid-column-gap: 7%;

  text-align: left;
  padding-left: 15%;
  
  background-color: #151F2E;
  color:  #728AA1;
`
const AnimeImage = styled.img`
  border-radius: 5px;
  width: 185px;
  height: 265px;
`

const DescriptionGrid = styled.div`
  display: grid;
  grid-template-rows: 30% 70%;
`
const AnimePageContent = styled.div`
  display: grid;
  grid-template-columns: 30% 70%; 
  background-color: #0b1622;
`

const LeftContent = styled.div`
  text-align: center;
  padding: 20px;
  
  display: block;
  color: #9FADBD;
`
const LeftContainer = styled.section`
  background-color: #151f2e;
`
const LeftTextStyle = styled.span`
color: #8586A5;
`
const TagContainer = styled.div`
  height: 10%;
  width: 50%;
  
  background-color: #151f2e;
  color: #8586A5;
  
  margin: 10px;
  
  text-align: left;
  padding-left: 1%;
  
  display: flex;
  justify-content: space-between;
  
  box-shadow: #1f2126;
  border-right: 5%;
`

const RightContent = styled.div`
  background-color: #888;
  text-align: center;
  padding: 20px;
`

const NavBar = styled.nav`
  display: grid;
  grid-template-rows: repeat(1fr);
  grid-template-columns: repeat(1fr);
`
const StyledLink = styled.nav`
  color: #9FADBD;
  &:hover{
    color: #61dafb;
    transition: 0.2s;
  }
  text-decoration: none;
  
  cursor: pointer;
`
