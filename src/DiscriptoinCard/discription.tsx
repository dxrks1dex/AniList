import styled from 'styled-components'
import React, { type JSX } from 'react'

export const discriptions = [
  {
    img: 'https://anilist.co/img/landing/stats.svg',
    titleCard: 'Discover your obsessions',
    discriptionCard: 'What are your highest rated genres or most watched voice actors? Follow your watching habits over time with in-depth statistics. '
  }, {
    img: 'https://anilist.co/img/landing/apps.svg',
    titleCard: 'Bring AniList anywhere',
    discriptionCard: 'Keep track of your progress on-the-go with one of many AniList apps across iOS, Android, macOS, and Windows.'
  }, {
    img: 'https://anilist.co/img/landing/social.svg',
    titleCard: 'Join the conversation',
    discriptionCard: 'Share your thoughts with our thriving community, make friends, socialize, and receive recommendations.'
  }, {
    img: 'https://anilist.co/img/landing/custom.svg',
    titleCard: 'Tweak it to your liking',
    discriptionCard: 'Customize your scoring system, title format, color scheme, and much more! Also, we have a dark mode.'
  }
]

export const InformationBlock = (): JSX.Element => {
  return <DescriptionBlock>

        <DescriptionPlatform>
            <DescriptionTitle>The next-generation anime platform</DescriptionTitle>
            <DescriptionSubtitle>Track, share, and discover your favorite anime and manga with AniList</DescriptionSubtitle>
        </DescriptionPlatform>

        <DescriptionCard>
            {discriptions.map(item => <>
                <InformationBlockCard key={item.titleCard}>
                    <CardImage src={item.img} alt=""/>
                    <CardTitleAndDescription>
                        <CardTitle>{item.titleCard}</CardTitle>
                        <CardDiscription>
                            {item.discriptionCard}
                        </CardDiscription>
                    </CardTitleAndDescription>
                </InformationBlockCard>
            </>)}
        </DescriptionCard>
        <JoinNowButton>Join Now</JoinNowButton>
    </DescriptionBlock>
}

export const DescriptionBlock = styled.section`
    user-select: none;

    margin: 20px auto auto auto;

    width: 1098px;
    height: 637px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-content: space-around;

    align-items: center;

    border-radius: 20px;

    background-color: #0a1625;
`
export const DescriptionPlatform = styled.div`
    //margin: auto;

    width: 561px;
    height: 124px;

    text-align: center;

    color: white;
`

export const DescriptionTitle = styled.h1`

    font-size: 30px;

    color: #F0F3F6;
`
export const DescriptionSubtitle = styled.h3`
    font-size: 20px;
    font-weight: 450;
    line-height: 30px;   

    margin-left: 100px;
    margin-right: 100px;

    color: #ACD5F2;
`

export const DescriptionCard = styled.section`
    margin-top: 30px;

    width: 921px;
    height: 255px;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    color: white;

`
export const InformationBlockCard = styled.section`
    margin-top: -60px; 
    margin-bottom: 100px;

    width: 451px;
    height: 104px;
    
    display: flex;
    justify-content: space-around;
`

export const CardImage = styled.img`
    height: 85.67px;
    width: 82px;
`
export const CardTitleAndDescription = styled.div`

    width: 280px;

    display: flex;
    flex-direction: column;
    justify-content: center;

`

export const CardTitle = styled.h3`
    margin: 0 0 10px 0;

    height: 20px;

    font-weight: 600;

    color: #ECF6FE;
`
export const CardDiscription = styled.span`
    height: 61px;
  
    color: #ACD5F2;

    font-size: 14px;
    line-height: 22px;

`

export const JoinNowButton = styled.button`
    position: absolute;

    width: 200px;
    height: 50px;

    margin-top: 630px;
    
    color: #F7FAFC;
    background-color: #3577FF;

    font-size: 18px;
    font-weight: 550;

    border-radius: 50px; 
    border: none;
    
    cursor: pointer;

    &:hover {
        box-shadow: 0 0 40px  #5c91ff;
        transition: 0.6s;
    }
`
