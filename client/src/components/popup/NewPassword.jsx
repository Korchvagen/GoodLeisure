import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewPassword, selectNewPAsswordErrors } from '../../redux/slices/auth.js';
import { ErrorMessage } from '../ErrorMessage.jsx';

export function NewPassword({ changeComponentEmail, setActive }) {
  const [newPpasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmNewPpasswordVisible, setConfirmNewPasswordVisible] = useState(false);
  const [newPpassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleToggleNewPassword = (e) => {
    setNewPasswordVisible(!newPpasswordVisible);

    e.target.classList.toggle('active');
  };

  const handleToggleConfirmNewPassword = (e) => {
    setConfirmNewPasswordVisible(!confirmNewPpasswordVisible);

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

  const newPasswordErrors = useSelector(selectNewPAsswordErrors);
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
    values.email = window.localStorage.getItem('email');

    const data = await dispatch(fetchNewPassword(values));

    if (!data.payload.success) {
      document.querySelector('.error-message').textContent = data.payload.message
    } else {
      window.localStorage.removeItem('email');
      setActive(false);
      changeComponentEmail(true);
    }
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
            type={newPpasswordVisible ? 'text' : 'password'}
            {...register('newPassword', { required: 'Укажите новый пароль' })}
            onChange={handleNewPasswordChange}
            value={newPpassword}
          />
          <button type='button' className='hide-password-btn' onClick={handleToggleNewPassword}></button>
        </div>
        <span className='error-message'>{errors.newPassword?.message}</span>
        <label htmlFor="confirmNewPassword">Повторите пароль</label>
        <div className='input-container'>
          <input id='confirmNewPassword'
            type={confirmNewPpasswordVisible ? 'text' : 'password'}
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