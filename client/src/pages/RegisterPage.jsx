import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchRegister, selectRegisterErrors } from '../redux/slices/auth.js';
import { ErrorMessage } from '../components/ErrorMessage.jsx';

export const RegisterPage = () => {
  const registerErrors = useSelector(selectRegisterErrors);
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm(
    {
      defaultValues: {
        email: '',
        password: ''
      }
    }
  );

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (window.localStorage.getItem('token')) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <h1>Регистрация</h1>
      {
        registerErrors && <ErrorMessage errors={registerErrors}/>
      }
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column' }}>
        <label>
          Email
          <input
            type="text"
            {...register('email', { required: 'Укажите почту' })}
          />
          <span>{errors.email?.message}</span>
        </label>
        <label>
          Password
          <input
            type="password"
            {...register('password', { required: 'Укажите пароль' })}
          />
          <span>{errors.password?.message}</span>
        </label>
        <button type="submit">Submit</button>
        <Link to="/auth/login">авторизация</Link>
      </form>
    </>
  )
}
