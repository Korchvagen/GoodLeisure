import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecoveryCode, selectEmail } from '../../redux/slices/auth.js';

export function CheckCode() {
  const dispatch = useDispatch();
  const email = useSelector(selectEmail);

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


  };

  const resendCode = async () => {
    const data = await dispatch(fetchRecoveryCode(email));

    if (!data.payload.success) {
      document.getElementById('sendError').textContent = data.payload.message;
    }
  };

  return (
    <>
      <p className='container__text code-text'>Вам на почту был отправлен код восстановления. Если вы его не получили, запросите код ещё раз.</p>
      <form className='container__form'>
        <label htmlFor="email">Код восстановления</label>
        <input id='email' type='text' {...register('email', { required: 'Укажите почту' })} />
        <span id='sendError'></span>
        <span>{errors.email?.message}</span>
        <button type='submit' className='popup-form__button'>Продолжить</button>
        <button className='popup-form__button repeat-button' onClick={resendCode}>Повторить отправку кода</button>
      </form>
    </>
  );
}