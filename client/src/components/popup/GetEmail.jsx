import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmail, selectMessage } from '../../redux/slices/auth.js';
import { setLoading } from '../../redux/slices/loader.js';
import { useTranslation } from 'react-i18next';

export function GetEmail({ changeComponentEmail, changeComponentCode }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const emailError = useSelector(selectMessage);

  const { register, handleSubmit, formState: { errors } } = useForm(
    {
      defaultValues: {
        recoveryEmail: ''
      }
    }
  );

  const onSubmit = async (recoveryEmail) => {
    dispatch(setLoading(true));
    const data = await dispatch(fetchEmail(recoveryEmail));

    if (data.payload?.success) {
      window.localStorage.setItem('code', data.payload.code);
      window.localStorage.setItem('email', data.payload.email);

      changeComponentEmail(false);
      changeComponentCode(true);
    }

    dispatch(setLoading(false));
  };

  const hideError = () => {
    document.querySelectorAll('.error-message').forEach(el => el.textContent = "");
  };

  return (
    <>
      <p className='container__text email-text'>{t('recovery.email-text')}</p>
      <form className='container__form' onSubmit={handleSubmit(onSubmit)}>
        { emailError && <p id='error-recoveryEmail' className='error-message'>{emailError}</p> }
        <label htmlFor="recoveryEmail">{t('recovery.email-label')}</label>
        <input id='recoveryEmail' type='text' {...register('recoveryEmail', { required: t('recovery.empty-email') })} onChange={hideError}/>
        <span className='error-message'>{errors.recoveryEmail?.message}</span>
        <button type='submit' className='popup-form__button'>{t('recovery.continue-btn')}</button>
      </form>
    </>
  );
}