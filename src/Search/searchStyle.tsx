import styled from 'styled-components'

export const SearchBar = styled.section`
  margin-top: 4%;

  
  display: grid;
  grid-template-columns: repeat(5, 1fr) 0.4fr;
  grid-gap: 25px;
  justify-content: space-between;
`
export const SearchSectionName = styled.span`
  font-weight: 500;
  color: #516170;
`
export const SearchSection = styled.section`
  margin-top: 8%;
  
  align-items: center;
  display: flex;
  justify-content: center;
  
  background-color: #FBFBFB;
  
  height: 40px;
  max-width: 100%;

  box-shadow: 0 5px 45px rgba(0, 0, 150, 0.1);
  border-radius: 7px;
`
export const SearchInput = styled.input`
  border: none;
  margin: 0 0 0 0;
  padding: 0 0 0 0;
  
  color: #5C728A;
  
  width: 60%;
  height: 60%;

  &:active, &:hover, &:focus {
    outline: 0;
    outline-offset: 0;
  }
`

export const SearchButton = styled.button`
  border: none;
  background-color: #FBFBFB;
  margin: 0 10px 0 10px;
  padding: 0 0 0 0;
  

  color: #5C728A;
  
  &:hover {
    color: #2E3945;
    transition: 0.5s;
  }
  
`

export const GenreDataList = styled.datalist`
  margin-top: 1%;

  align-items: center;
  display: flex;
  justify-content: center;

  background-color: #FBFBFB;

  height: 40px;
  width: 12%;

  box-shadow: 0 5px 45px rgba(0, 0, 150, 0.1);
  border-radius: 7px;
  border: none;

  &:active, &:hover, &:focus {
    outline: 0;
    outline-offset: 0;
  }
`
export const SearchersLine = styled.div`
  display: flex;
  justify-content: space-between;
`
