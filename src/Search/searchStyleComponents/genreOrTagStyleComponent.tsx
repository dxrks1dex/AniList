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
export const SelectOptionSection = styled.section`
  color: #748899;
  cursor: pointer;

  padding: 5px 10px 10px 10px;
  margin: 0 10px 0 10px;
  
  border-radius: 5px;
  
  &:hover {
    color: #3DB4F2;
    transition: 0.4s;
    background-color: #EDF1F5;
  }

  font-size: 14px;
  font-weight: 500;
  
  display: flex;
  justify-content: space-between;
`
export const SearchInputPlaceholderBadge = styled.div`
  background-color: #DDE6EECC;
  color: #647380;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  height: auto;
  max-width: 5%;
  
  padding: 5px;
  
  position: absolute;
  
  border-radius: 7px;

  font-size: 13px;
  font-weight: 400;
`
