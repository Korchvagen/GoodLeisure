import React from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../redux/slices/auth.js';
import { NotAuthLinks } from './NotAuthLinks.jsx';
import { AuthLinks } from './AuthLinks.jsx';
import '../../styles/structure/header/navbar.scss';

export const Navbar = () => {
  const isAuth = useSelector(selectAuth);

  return (
    <nav className='nav'>
      <ul className='nav__list'>
        {
          isAuth
            ?
            <AuthLinks />
            :
            <NotAuthLinks />
        }
      </ul>
    </nav>
  )
}
