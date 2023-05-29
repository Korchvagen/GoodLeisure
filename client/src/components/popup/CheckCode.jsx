import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCode, fetchEmail, selectMessage } from '../../redux/slices/auth.js';
import { startTimer } from '../../scripts/timer.js';
import { setLoading } from '../../redux/slices/loader.js';

export function CheckCode({ changeComponentCode }) {
  useEffect(() => {
    startTimer();
  }, []);

  const dispatch = useDispatch();
  const codeError = useSelector(selectMessage);

  const { register, handleSubmit, formState: { errors } } = useForm(
    {
      defaultValues: {
        code: ''
      }
    }
  );

  const onSubmit = async (values) => {
    dispatch(setLoading(true));
    values.stateCode = window.localStorage.getItem('code');
    
    const data = await dispatch(fetchCode(values));

    if (data.payload?.success) {
      window.localStorage.removeItem('code');
      changeComponentCode(false);
    }

    dispatch(setLoading(false));
  };

  const resendCode = async () => {
    const repeatEmail = { email: window.localStorage.getItem('email') };
    const data = await dispatch(fetchEmail(repeatEmail));

    if (!data.payload.success) {
      document.querySelector('.error-code').textContent = data.payload.message;
    } else {
      window.localStorage.setItem('code', data.payload.code);

      startTimer();
    }
  };

  const hideError = () => {
    document.querySelectorAll('.error-message').forEach(el => el.textContent = "");
  };

  return (
    <>
      <p className='container__text code-text'>Вам на почту был отправлен код восстановления. Если вы его не получили, запросите код ещё раз.</p>
      <form className='container__form' onSubmit={handleSubmit(onSubmit)}>
        { codeError && <p className='error-message error-code'>{codeError}</p> }
        <label htmlFor="code">Код восстановления</label>
        <input id='code' type='text' {...register('code', { required: 'Укажите код подтверждения' })} onChange={hideError}/>
        <span className='error-message'>{errors.code?.message}</span>
        <p id='timer'></p>
        <button type='submit' className='popup-form__button'>Продолжить</button>
      </form>
      <button className='popup-form__button repeat-button' onClick={resendCode}>Повторить отправку кода</button>
    </>
  );
}