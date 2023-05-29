import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewPassword, selectErrors } from '../../redux/slices/auth.js';
import { ErrorMessage } from '../ErrorMessage.jsx';
import { setLoading } from '../../redux/slices/loader.js';

export function NewPassword({ changeComponentEmail, setActive }) {
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleToggleNewPassword = (e) => {
    setNewPasswordVisible(!newPasswordVisible);

    e.target.classList.toggle('active');
  };

  const handleToggleConfirmNewPassword = (e) => {
    setConfirmNewPasswordVisible(!confirmNewPasswordVisible);

    e.target.classList.toggle('active');
  };

  const handleNewPasswordChange = (e) => {
    document.querySelectorAll('.error-message').forEach(el => el.textContent = "");
    document.querySelectorAll('li').forEach(el => el.textContent = "");

    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e) => {
    document.querySelectorAll('.error-message').forEach(el => el.textContent = "");
    document.querySelectorAll('li').forEach(el => el.textContent = "");

    setConfirmNewPassword(e.target.value);
  };

  const newPasswordErrors = useSelector(selectErrors);
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm(
    {
      defaultValues: {
        newPassword: '',
        confirmNewPassword: ''
      }
    }
  );

  const onSubmit = async (values) => {
    dispatch(setLoading(true));
    values.email = window.localStorage.getItem('email');

    const data = await dispatch(fetchNewPassword(values));

    if (data.payload?.success) {
      window.localStorage.removeItem('email');
      setActive(false);
      changeComponentEmail(true);
    }

    dispatch(setLoading(false));
  };

  return (
    <>
      <form className='container__form' onSubmit={handleSubmit(onSubmit)}>
        {
          newPasswordErrors && <ErrorMessage errors={newPasswordErrors} />
        }
        <label htmlFor="newPassword">Новый пароль</label>
        <div className='input-container'>
          <input id='newPassword'
            type={newPasswordVisible ? 'text' : 'password'}
            {...register('newPassword', { required: 'Укажите новый пароль' })}
            onChange={handleNewPasswordChange}
            value={newPassword}
          />
          <button type='button' className='hide-password-btn' onClick={handleToggleNewPassword}></button>
        </div>
        <span className='error-message'>{errors.newPassword?.message}</span>
        <label htmlFor="confirmNewPassword">Повторите пароль</label>
        <div className='input-container'>
          <input id='confirmNewPassword'
            type={confirmNewPasswordVisible ? 'text' : 'password'}
            {...register('confirmNewPssword', { required: 'Повторите новый пароль' })}
            onChange={handleConfirmNewPasswordChange}
            value={confirmNewPassword}
          />
          <button type='button' className='hide-password-btn' onClick={handleToggleConfirmNewPassword}></button>
        </div>
        <span className='error-message'>{errors.confirmNewPassword?.message}</span>
        <button type='submit' className='popup-form__button'>Сохранить</button>
      </form >
    </>
  );
}