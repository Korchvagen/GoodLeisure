import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEditPassword, selectErrors, selectMessage } from '../../redux/slices/auth.js';
import { ErrorMessage } from '../ErrorMessage.jsx';
import { setLoading } from '../../redux/slices/loader.js';
import { useTranslation } from 'react-i18next';

export function EditPassword({ setActive }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const editPasswordErrors = useSelector(selectErrors);
  const editPasswordMessage = useSelector(selectMessage);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [password, setPassword] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm(
    {
      defaultValues: {
        newPassword: '',
        confirmNewPassword: '',
        password: ''
      }
    }
  );

  const handleToggleNewPassword = (e) => {
    setNewPasswordVisible(!newPasswordVisible);

    e.target.classList.toggle('active');
  };

  const handleToggleConfirmNewPassword = (e) => {
    setConfirmNewPasswordVisible(!confirmNewPasswordVisible);

    e.target.classList.toggle('active');
  };

  const handleTogglePassword = (e) => {
    setPasswordVisible(!passwordVisible);

    e.target.classList.toggle('active');
  };

  const handleNewPasswordChange = (e) => {
    document.querySelectorAll('.error-message').forEach(el => el.textContent = "");

    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e) => {
    document.querySelectorAll('.error-message').forEach(el => el.textContent = "");

    setConfirmNewPassword(e.target.value);
  };

  const handlePasswordChange = (e) => {
    document.querySelectorAll('.error-message').forEach(el => el.textContent = "");

    setPassword(e.target.value);
  };

  const onSubmit = async (values) => {
    dispatch(setLoading(true));
    const data = await dispatch(fetchEditPassword(values));

    if(data.payload?.success){
      setActive(false);
    }

    dispatch(setLoading(false));
  };

  return (
    <div className='edit-password-container'>
      <h2 className='container__title'>{t('edit-password.title')}</h2>
      <form className='container__form' onSubmit={handleSubmit(onSubmit)}>
        { editPasswordErrors && <ErrorMessage errors={editPasswordErrors} />}
        { editPasswordMessage && <p id='error-password' className='error-message'>{editPasswordMessage}</p> }
        <label htmlFor="newPassword">{t('edit-password.new-password-label')}</label>
        <div className='input-container'>
          <input id='newPassword'
            type={newPasswordVisible ? 'text' : 'password'}
            {...register('newPassword', { required: t('edit-password.empty-new-password') })}
            onChange={handleNewPasswordChange}
            value={newPassword}
          />
          <button type='button' className='hide-password-btn' onClick={handleToggleNewPassword}></button>
        </div>
        <span className='error-message'>{errors.newPassword?.message}</span>
        <label htmlFor="confirmNewPassword">{t('edit-password.confirm-new-password-label')}</label>
        <div className='input-container'>
          <input id='confirmNewPassword'
            type={confirmNewPasswordVisible ? 'text' : 'password'}
            {...register('confirmNewPassword', { required: t('edit-password.empty-confirm-new-password') })}
            onChange={handleConfirmNewPasswordChange}
            value={confirmNewPassword}
          />
          <button type='button' className='hide-password-btn' onClick={handleToggleConfirmNewPassword}></button>
        </div>
        <span className='error-message'>{errors.confirmNewPassword?.message}</span>
        <label htmlFor="password" className='confirm-text'>{t('edit-password.text')}</label>
        <div className='input-container'>
          <input id='password'
            type={passwordVisible ? 'text' : 'password'}
            {...register('password', { required: t('edit-password.empty-password') })}
            onChange={handlePasswordChange}
            value={password}
          />
          <button type='button' className='hide-password-btn' onClick={handleTogglePassword}></button>
        </div>
        <span className='error-message'>{errors.password?.message}</span>
        <button type='submit' className='popup-form__button'>{t('edit-password.save-btn')}</button>
      </form>
    </div>
  );
}