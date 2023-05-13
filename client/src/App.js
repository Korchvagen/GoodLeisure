import { Layout } from './components/Layout.jsx';
import { Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/MainPage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { RegisterPage } from './pages/RegisterPage.jsx';
import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchAuthMe } from './redux/slices/auth.js';
import "./styles/index.scss";
import { fetchInterests } from './redux/slices/interests.js';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe());
    dispatch(fetchInterests())
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path='/' element={ <MainPage />}/>
        <Route path='/auth/login' element={ <LoginPage />}/>
        <Route path='/auth/register' element={ <RegisterPage />}/>
      </Routes>
    </Layout>
  );
}

export default App;
