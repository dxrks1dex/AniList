import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { RouterProvider } from 'react-router-dom'
import { routing } from './Routing/routing'
import { FooterDescription, FooterStyle, SiteTheme, TextContainer } from './global/footerStyle'
// import { Router } from 'react-router-dom'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
    <React.StrictMode>
        <RouterProvider router={routing} />
      <FooterStyle>
          <TextContainer>
              <SiteTheme>Site Theme</SiteTheme>
              <FooterDescription>Donate</FooterDescription>
          </TextContainer>
      </FooterStyle>
  </React.StrictMode>

)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
