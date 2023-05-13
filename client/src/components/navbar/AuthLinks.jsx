import React from 'react';
import { Link } from 'react-router-dom';

export const AuthLinks = () => {
  return (
    <>
      <Link className='nav__list__item' to="/">
        <div className='list__item__image main-image'></div>
        <span className='list__item__text'>Главная</span>
      </Link>
      <Link className='nav__list__item' to="/favorites">
        <div className='list__item__image favorites-image'></div>
        <span className='list__item__text'>Избранное</span>
      </Link>
      <Link className='nav__list__item' to="/propfile">
        <div className='list__item__image profile-image'></div>
        <span className='list__item__text'>Личный кабинет</span>
      </Link>
    </>
  )
}