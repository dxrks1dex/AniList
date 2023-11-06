import styled from 'styled-components'
// import { type JSX } from 'react'
//
// interface colorProps {
//     color: string
// }
// export const getColorDefine = ({ color }: colorProps) => {
//     color === '#d6e428' ?
//         'hsl(14,80%,30%)'
//         :
//         color
//
//     return {color === '#d6e428' && '#e4d6a1' && '#e4a143' ? 'hsl(14,80%,30%)' : color
// }
// }

export const AnimeComponentStyle = styled.section < { hoverColor: string | null | undefined } >`
  font-family: Roboto,-apple-system,BlinkMacSystemFont,Segoe UI,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
  
  
  height: 315px;
  width : 185px;
  
  overflow: hidden;
  text-overflow: ellipsis;

  color: grey;
  &:hover {
    color: ${props => props.hoverColor};
    transition: 0.4s;
  }
`
export const AnimeTitleStyle = styled.a`

  font-size: 15px;
  font-weight: 500;
  line-height: 10px;
  
  margin-top: 10px;

  cursor: pointer;

`
export const AnimeSection = styled.section`
//position: absolute;
  
  margin-top: 20px;


  display: flex;
  justify-content: space-between;

`
export const AnimeImage = styled.img`
  border-radius: 5px;
  width: 185px;
  height: 265px;
`
export const ListName = styled.a`
  display: flex;
  justify-content: space-between;
  
  margin-top: 60px;
  //margin-bottom: 30px;

  cursor: pointer;

  font-weight: 650;
  line-height: 10px;

  color:  #647380;
  &:hover {
    color: #54606b;
    transition: 0.05s;
  };

`

export const ViewAll = styled.a`
  display: flex;
  cursor: pointer;

  font-weight: 650;
  font-size: 13px;

  color: #8BA0B2;

  &:hover {
    color: #54606b;
    transition: 0.4s;
  };
`
