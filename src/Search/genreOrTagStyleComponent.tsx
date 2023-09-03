import styled from 'styled-components'

export const GenreOrTagStyleList = styled.section`
  max-height: 30rem;
  width: 10.7%;
  
  margin-top: 1%;
  
  position: absolute;
  
  overflow: hidden;
  &:hover {
    transition: 0.4s;
    overflow-y: scroll;
  }
  
  border-radius: 5px;
  
  background-color: #fff;

  box-shadow: 0 5px 45px rgba(0, 0, 150, 0.1);
  
`
export const GenreTagTitleStyle = styled.h1`
  color: #5C728A;
  
  margin: 10px 10px 10px 10px;
  
  cursor: default;
  
  font-size: 14px;
  font-weight: 500;
`
export const GenresOrTags = styled.section`
  color: #748899;
  cursor: pointer;

  padding: 5px 10px 10px 10px;
  margin: 0 10px 0 10px;
  
  border-radius: 5px;
  
  &:hover {
    color: #3577FF;
    transition: 0.4s;
    background-color: #EDF1F5;
  }

  font-size: 14px;
  font-weight: 500;
`
