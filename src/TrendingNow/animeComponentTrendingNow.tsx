import styled from 'styled-components'

export const AnimeComponentStyle = styled.section < { color: string | null | undefined } >`  
  height: 295px;
  width : 185px;

  white-space: nowrap;

  overflow: hidden;
  text-overflow: ellipsis;

  color: grey;
  &:hover {
    color: ${props => props.color};
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

  margin-left: 220px;
  margin-right: 220px;
  margin-top: 20px;


  display: flex;
  justify-content: space-between;

`
export const AnimeImage = styled.img`
  border-radius: 5px;
  width: 185px;
  height: 265px;
  
  cursor: pointer;
  
`
export const ListName = styled.a`
  display: flex;
  justify-content: space-between;

  margin-right: 220px;
  margin-left: 220px;
  margin-top: 60px;

  cursor: pointer;

  font-weight: 650;
  line-height: 10px;

  color:  #647380;
  &:hover {
    color: #54606b;
    transition: 0.4s;
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
