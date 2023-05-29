import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeleteAccount, fetchEmail, logout, selectEditError } from '../../redux/slices/auth.js';
import { Navigate } from 'react-router-dom';

export function DeleteAccount() {
  const dispatch = useDispatch();
  const deleteError = useSelector(selectEditError);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [isAccountDeleted, setAccountDeleted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm(
    {
      defaultValues: {
        password: ''
      }
    }
  );

  const handleTogglePassword = (e) => {
    setPasswordVisible(!passwordVisible);

    e.target.classList.toggle('active');
  };

  const handlePasswordChange = (e) => {
    document.querySelectorAll('.error-message').forEach(el => el.textContent = "");

    setPassword(e.target.value);
  };

  const onSubmit = async (values) => {
    const data = await dispatch(fetchDeleteAccount(values));

    if (data.payload?.success) {
      setAccountDeleted(true);
    }
  };

  if (isAccountDeleted) {
    dispatch(logout());
    window.localStorage.removeItem('token');
    return <Navigate to="/" />;
  }

  return (
    <div className='delete-account-container'>
      <h2 className='container__title'>Удаление учетной записи</h2>
      <form className='container__form' onSubmit={handleSubmit(onSubmit)}>
        {deleteError && <p id='error-email' className='error-message'>{deleteError}</p>}
        <label htmlFor="password">Введите пароль от учётной записи, чтобы подтвердить действие</label>
        <div className='input-container'>
          <input id='password'
            type={passwordVisible ? 'text' : 'password'}
            {...register('password', { required: 'Укажите пароль' })}
            onChange={handlePasswordChange}
            value={password}
          />
          <button type='button' className='hide-password-btn' onClick={handleTogglePassword}></button>
        </div>
        <span className='error-message'>{errors.password?.message}</span>
        <button type='submit' className='popup-form__button'>Удалить</button>
      </form>
    </div>
  );
}