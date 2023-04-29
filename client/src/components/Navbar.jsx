import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../redux/slices/auth.js';

export const Navbar = () => {
  const dispatch = useDispatch();
  const onClickLogout = () => {
    dispatch(logout());

    window.localStorage.removeItem('token');
  };

  return (
    <>
      { window.localStorage.key('token') && <button onClick={onClickLogout}>Выйти</button>}
    </>
  )
}
