import React from 'react';
import { Logo } from './Logo.jsx';
import { Navbar } from './navbar/Navbar.jsx';
import { Languages } from './Languages.jsx';
import '../styles/header.scss';

export function Header() {
  return (
    <header className='header'>
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