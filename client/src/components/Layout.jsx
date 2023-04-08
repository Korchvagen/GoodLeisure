import React from 'react'
import { Navbar } from './Navbar.jsx';

export const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      { children }
    </React.Fragment>
  )
}
