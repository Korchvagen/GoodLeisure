import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.scss';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/auth.js';

export const Navbar = () => {
  const dispatch = useDispatch();
  const onClickLogout = () => {
    dispatch(logout());

    window.localStorage.removeItem('token');
  };

  return (
    <nav className='nav'>
      <button onClick={onClickLogout}>Выйти</button>
      <ul className='nav__list'>
        <Link className='nav__list__item' to="/">
          <div className='list__item__image'></div>
          <span className='list__item__text'>Главная</span>
        </Link>
      </ul>
    </nav>
  )
}
