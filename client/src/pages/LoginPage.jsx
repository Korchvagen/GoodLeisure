import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin, selectIsAuth } from '../redux/slices/auth.js';
import { Popup } from '../components/popup/Popup.jsx';
import { AccountRecovery } from '../components/popup/AccountRecovery.jsx';

export const LoginPage = () => {
  const [popupActive, setPopupActive] = useState(false)
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm(
    {
      defaultValues: {
        email: '',
        password: ''
      }
    }
  );

  const onSubmit = async (values) => {
    const data = await dispatch(fetchLogin(values));

    if (data.payload.message) {
      document.getElementById('loginError').textContent = data.payload.message;
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <h1>Авторизация</h1>
      <p id='loginError'></p>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column' }}>
        <label>
          Email
          <input
            type="text"
            {...register('email', { required: 'Укажите почту' })}
          />
          <span>{errors.email?.message}</span>
        </label>
        <label>
          Password
          <input
            type="password"
            {...register('password', { required: 'Укажите пароль' })}
          />
          <span>{errors.password?.message}</span>
        </label>
        <button type="submit">Войти</button>
        <a onClick={() => setPopupActive(true)}>Забыли пароль?</a>
        <Link to="/auth/register">Регистрация</Link>
      </form>
      <Popup active={popupActive} setActive={setPopupActive}>
        <AccountRecovery />
      </Popup>
    </>
  )
}
