import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { fetchRecoveryCode } from '../../redux/slices/auth.js';

export function GetEmail({ changeComponent }) {
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm(
    {
      defaultValues: {
        email: ''
      }
    }
  );

  const onSubmit = async (email) => {
    const data = await dispatch(fetchRecoveryCode(email));

    if (!data.payload.success) {
      document.getElementById('sendError').textContent = data.payload.message;
    }

    changeComponent(false);
  };

  return (
    <>
      <p className='container__text email-text'>Укажите электронную почту от утерянной учетной записи, чтобы мы отправили Вам код восстановления.</p>
      <form className='container__form' onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Электронная почта</label>
        <input id='email' type='text' {...register('email', { required: 'Укажите почту' })} />
        <span id='sendError'></span>
        <span>{errors.email?.message}</span>
        <button type='submit' className='popup-form__button'>Продолжить</button>
      </form>
    </>
  );
}