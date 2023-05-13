import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const NotAuthLinks = () => {
  const [navbarLinks, setNavbarLinks] = useState(true);

  const hadleToggleNavbarLinks = () => {
    setNavbarLinks(!navbarLinks);
  }

  return (
    <>
      {
        navbarLinks
          ?
          <Link className='nav__list__item' to="/auth/login" onClick={hadleToggleNavbarLinks}>
            < div className='list__item__image entrance-image' ></div >
            <span className='list__item__text'>Войти</span>
          </Link >
          :
          <Link className='nav__list__item' to="/" onClick={hadleToggleNavbarLinks}>
            <div className='list__item__image main-image'></div>
            <span className='list__item__text'>Главная</span>
          </Link>
      }
    </>
  )
}