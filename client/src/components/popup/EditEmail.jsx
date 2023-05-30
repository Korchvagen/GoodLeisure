import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEditEmail, selectMessage } from '../../redux/slices/auth.js';
import { setLoading } from '../../redux/slices/loader.js';
import { useTranslation } from 'react-i18next';

export function EditEmail({ setActive }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const editError = useSelector(selectMessage);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm(
    {
      defaultValues: {
        email: '',
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
  }

  const onSubmit = async (values) => {
    dispatch(setLoading(true));
    const data = await dispatch(fetchEditEmail(values));

    if(data.payload?.success){
      setActive(false);
    }
    
    dispatch(setLoading(false));
  };

  const hideError = () => {
    document.querySelectorAll('.error-message').forEach(el => el.textContent = "");
  };

  return (
    <div className='edit-email-container'>
      <h2 className='container__title'>{t('edit-email.title')}</h2>
      <form className='container__form' onSubmit={handleSubmit(onSubmit)}>
        { editError && <p id='error-email' className='error-message'>{editError}</p> }
        <label htmlFor="email">{t('edit-email.email-label')}</label>
        <input id='email' type='text' {...register('email', { required: t('edit-email.epmty-email') })} onChange={hideError}/>
        <span className='error-message'>{errors.email?.message}</span>
        <label htmlFor="password" className='confirm-text'>{t('edit-email.text')}</label>
        <div className='input-container'>
          <input id='password'
            type={passwordVisible ? 'text' : 'password'}
            {...register('password', { required: t('edit-email.empty-password') })}
            onChange={handlePasswordChange}
            value={password}
          />
          <button type='button' className='hide-password-btn' onClick={handleTogglePassword}></button>
        </div>
        <span className='error-message'>{errors.password?.message}</span>
        <button type='submit' className='popup-form__button'>{t('edit-email.save-btn')}</button>
      </form>
    </div>
  );
}