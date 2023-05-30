import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeleteAccount, resetAuth, selectMessage } from '../../redux/slices/auth.js';
import { Navigate } from 'react-router-dom';
import { setLoading } from '../../redux/slices/loader.js';
import { resetInterests } from '../../redux/slices/interests.js';
import { resetFavorites } from '../../redux/slices/favorites.js';
import { resetLeisures } from '../../redux/slices/leisures.js';
import { resetProfile } from '../../redux/slices/profile.js';
import { resetCoords } from '../../redux/slices/coords.js';
import { useTranslation } from 'react-i18next';

export function DeleteAccount() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const deleteError = useSelector(selectMessage);
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
    dispatch(setLoading(true));
    const data = await dispatch(fetchDeleteAccount(values));

    if (data.payload?.success) {
      setAccountDeleted(true);
    }

    dispatch(setLoading(false));
  };

  if (isAccountDeleted) {
    dispatch(resetAuth());
    dispatch(resetInterests());
    dispatch(resetLeisures());
    dispatch(resetFavorites());
    dispatch(resetProfile());
    dispatch(resetCoords(null));
    window.localStorage.removeItem('token');
    return <Navigate to="/" />;
  }

  return (
    <div className='delete-account-container'>
      <h2 className='container__title'>{t('delete-account.title')}</h2>
      <form className='container__form' onSubmit={handleSubmit(onSubmit)}>
        {deleteError && <p id='error-email' className='error-message'>{deleteError}</p>}
        <label htmlFor="password">{t('delete-account.text')}</label>
        <div className='input-container'>
          <input id='password'
            type={passwordVisible ? 'text' : 'password'}
            {...register('password', { required: t('delete-account.empty-password') })}
            onChange={handlePasswordChange}
            value={password}
          />
          <button type='button' className='hide-password-btn' onClick={handleTogglePassword}></button>
        </div>
        <span className='error-message'>{errors.password?.message}</span>
        <button type='submit' className='popup-form__button'>{t('delete-account.delete-btn')}</button>
      </form>
    </div>
  );
}