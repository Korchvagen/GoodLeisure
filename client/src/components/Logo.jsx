import React from 'react';
import '../styles/structure/header/logo.scss';
import { Link } from 'react-router-dom';

export function Logo(){
  return (
    <Link to={"/"} className="logo-container">
      <div className="logo-container__image"></div>
      <h1 className='logo-container__title'>GoodLeisure</h1>
    </Link>
  );
}