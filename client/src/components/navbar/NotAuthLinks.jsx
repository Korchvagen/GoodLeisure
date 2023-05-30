import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const NotAuthLinks = () => {
  const { t } = useTranslation();
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
            <span className='list__item__text'>{t('navbar.auth')}</span>
          </Link >
          :
          <Link className='nav__list__item' to="/" onClick={hadleToggleNavbarLinks}>
            <div className='list__item__image main-image'></div>
            <span className='list__item__text'>{t('navbar.home')}</span>
          </Link>
      }
    </>
  )
}