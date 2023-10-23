import styled from 'styled-components'

export const SearchArguments = styled.div`
  width: 10%;

  margin-left: 220px;
  margin-top: 20px;
  
  background-color: #3DB4F2;
  color: #FFFFFF;
  
  border-radius: 10%;
  cursor: pointer;
  
  display: flex;
  justify-content: space-between;
  
`

export const StyledClose = styled.i`
  & {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs, 1));
    width: 22px;
    height: 22px;
    border: 2px solid transparent;
    border-radius: 40px;
  }
  &::after,
  &::before {
    content: '';
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 10px;
    height: 2px;
    background: currentColor;
    transform: rotate(45deg);
    border-radius: 5px;
    top: 8px;
    left: 1px;
  }
  &::after {
    transform: rotate(-45deg);
  }
`
