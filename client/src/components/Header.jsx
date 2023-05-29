import React from 'react';
import { Logo } from './Logo.jsx';
import { Navbar } from './navbar/Navbar.jsx';
import { Languages } from './Languages.jsx';
import '../styles/structure/header/header.scss';
import { Loader } from './Loader.jsx';

export function Header() {
  return (
    <header className='header'>
      <Loader />
      <div className="header__container">
        <Logo />
        <div className='header__container__right-side'>
          <Navbar />
          <Languages />
        </div>
      </div>
    </header>
  );
}