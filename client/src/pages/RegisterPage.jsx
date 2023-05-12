import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchRegister, selectRegisterErrors } from '../redux/slices/auth.js';
import { ErrorMessage } from '../components/ErrorMessage.jsx';
import '../styles/auth.scss';

export const RegisterPage = () => {
  useEffect(() => {
    document.querySelectorAll('.error-message').forEach(el => el.textContent = "");
  }, []);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPpasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleTogglePassword = (e) => {
    setPasswordVisible(!passwordVisible);

    e.target.classList.toggle('active');
  };

  const handleToggleConfirmPassword = (e) => {
    setConfirmPasswordVisible(!confirmPpasswordVisible);

    e.target.classList.toggle('active');
  };

  const handlePasswordChange = (e) => {
    document.querySelectorAll('li').forEach(el => el.textContent = "");
    document.querySelector('.error-password').textContent = "";

    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    document.querySelectorAll('li').forEach(el => el.textContent = "");
    document.querySelector('.error-confirm-password').textContent = "";

    setConfirmPassword(e.target.value);
  };

  const hideError = () => {
    document.querySelectorAll('li').forEach(el => el.textContent = "");
    document.querySelector('.error-email').textContent = "";
  }

  const registerErrors = useSelector(selectRegisterErrors);
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm(
    {
      defaultValues: {
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  );

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (data.payload.message) {
      document.getElementById('registerError').textContent = data.payload.message;
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (window.localStorage.getItem('token')) {
    return <Navigate to="/" />;
  }

  return (
    <div className='register-page-wrapper'>
      <div className="left-side">
        <div className='left-side__greeting-img register-img'></div>
      </div>
      <div className="right-side">
        <div className='register-container'>
          <h2 className='register-container__title'>Регистрация</h2>
          <p id='registerError' className='error-message'></p>
          {
            registerErrors && <ErrorMessage errors={registerErrors} />
          }
          <form className='register-container__form' onSubmit={handleSubmit(onSubmit)}>
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
              <button type='button' className='hide-password-btn' onClick={handleTogglePassword}></button>
            </div>
            <span className='error-message error-password'>{errors.password?.message}</span>
            <label htmlFor="confirmPassword">Повторите пароль</label>
            <div className='input-container'>
              <input id='confirmPassword'
                type={confirmPpasswordVisible ? 'text' : 'password'}
                {...register('confirmPassword', { required: 'Повторите пароль' })}
                onChange={handleConfirmPasswordChange}
                value={confirmPassword}
              />
              <button type='button' className='hide-password-btn' onClick={handleToggleConfirmPassword}></button>
            </div>
            <span className='error-message error-confirm-password'>{errors.confirmPassword?.message}</span>
            <button className='form__button' type="submit">Зарегистрироваться</button>
          </form>
        </div>
        <div className='login-link-container'>
          <p className='login-link-container__text'>Вы уже зарегистрированы?</p>
          <Link className='login-link-container__link' to="/auth/login">Авторизация</Link>
        </div>
      </div>
    </div>
  )
}
