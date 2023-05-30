import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const AuthLinks = () => {
  const { t } = useTranslation();
  
  return (
    <>
      <Link className='nav__list__item' to="/">
        <div className='list__item__image main-image'></div>
        <span className='list__item__text'>{t('navbar.home')}</span>
      </Link>
      <Link className='nav__list__item' to="/favorites">
        <div className='list__item__image favorites-image'></div>
        <span className='list__item__text'>{t('navbar.favorites')}</span>
      </Link>
      <Link className='nav__list__item' to="/profile">
        <div className='list__item__image profile-image'></div>
        <span className='list__item__text'>{t('navbar.profile')}</span>
      </Link>
    </>
  )
}