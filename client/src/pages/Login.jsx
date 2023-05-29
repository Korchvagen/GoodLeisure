import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin, selectMessage } from '../redux/slices/auth.js';
import { Popup } from '../components/popup/Popup.jsx';
import { AccountRecovery } from '../components/popup/AccountRecovery.jsx';
import '../styles/pages/auth.scss';
import { fetchInterests } from '../redux/slices/interests.js';

export const LoginPage = () => {
  const loginError = useSelector(selectMessage);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [popupActive, setPopupActive] = useState(false)

  const handleTogglPassword = (e) => {
    setPasswordVisible(!passwordVisible);

    e.target.classList.toggle('active');
  };

  const handlePasswordChange = (e) => {
    document.querySelector('.error-message').textContent = "";
    document.querySelector('.error-password').textContent = "";

    setPassword(e.target.value);
  };

  const hideError = () => {
    document.querySelector('.error-message').textContent = "";
    document.querySelector('.error-email').textContent = "";
  }

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

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);

      dispatch(fetchInterests());
    }
  };

  if (window.localStorage.getItem('token')) {
    return <Navigate to="/" />;
  }

  return (
    <div className='login-page-wrapper'>
      <div className="left-side">
        <div className='left-side__greeting-img'></div>
        <p className='left-side__text'>Авторизовавшись в системе, Вы получите доступ к своему личному кабинету, поиску и процессу подбора досуга.
          После авторизации Вы сможете сохранить любимый досуг, чтобы в будущем иметь быстрый доступ к нему.
        </p>
      </div>
      <div className="right-side">
        <div className='login-container'>
          <h2 className='login-container__title'>Авторизация</h2>
          { loginError && <p id='loginError' className='error-message'>{loginError}</p> }
          <form className='login-container__form' onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">Электронная почта</label>
            <input type="text" id='email' {...register('email', { required: 'Укажите почту' })} onChange={hideError}/>
            <span className='error-message error-email'>{errors.email?.message}</span>
            <label htmlFor="password">Пароль</label>
            <div className='input-container'>
              <input type={passwordVisible ? 'text' : 'password'} id='password'
                {...register('password', { required: 'Укажите пароль' })}
                onChange={handlePasswordChange}
                value={password}
              />
              <button type='button' className='hide-password-btn' onClick={handleTogglPassword}></button>
            </div>
            <span className='error-message error-password'>{errors.password?.message}</span>
            <button className='form__button' type="submit">Войти</button>
          </form>
          <button className='open-popup-btn' onClick={() => setPopupActive(true)}>Забыли пароль?</button>
        </div>
        <div className='register-link-container'>
          <p className='register-link-container__text'>Вы не зарегистрированы?</p>
          <Link className='register-link-container__link' to="/auth/register">Регистрация</Link>
        </div>
        <Popup active={popupActive} setActive={setPopupActive}>
          <AccountRecovery setActive={setPopupActive} />
        </Popup>
      </div>
    </div>
  )
}
