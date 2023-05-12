import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { fetchEmail } from '../../redux/slices/auth.js';

export function GetEmail({ changeComponentEmail, changeComponentCode }) {
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm(
    {
      defaultValues: {
        email: ''
      }
    }
  );

  const onSubmit = async (email) => {
    const data = await dispatch(fetchEmail(email));

    if (!data.payload.success) {
      document.querySelector('.error-message').textContent = data.payload.message;
    } else {
      window.localStorage.setItem('code', data.payload.code);
      window.localStorage.setItem('email', data.payload.email);

      changeComponentEmail(false);
      changeComponentCode(true);
    }
  };

  const hideError = () => {
    document.querySelectorAll('.error-message').forEach(el => el.textContent = "");
  };

  return (
    <>
      <p className='container__text email-text'>Укажите электронную почту от утерянной учетной записи, чтобы мы отправили Вам код восстановления.</p>
      <form className='container__form' onSubmit={handleSubmit(onSubmit)}>
        <p className='error-message'></p>
        <label htmlFor="email">Электронная почта</label>
        <input id='email' type='text' {...register('email', { required: 'Укажите почту' })} onChange={hideError}/>
        <span className='error-message'>{errors.email?.message}</span>
        <button type='submit' className='popup-form__button'>Продолжить</button>
      </form>
    </>
  );
}