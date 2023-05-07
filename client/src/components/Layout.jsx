import React from 'react';
import { Header } from './Header.jsx';
import { Main } from './Main.jsx';
import { Footer } from './Footer.jsx';

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Main>
        {children}
      </Main>
      <Footer />
    </>
  )
}
