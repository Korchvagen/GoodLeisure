import React from 'react';
import { Layout } from './components/Layout.jsx';
import { Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/Main.jsx';
import { LoginPage } from './pages/Login.jsx';
import { RegisterPage } from './pages/Register.jsx';
import { useDispatch } from 'react-redux';
import { fetchAuthMe } from './redux/slices/auth.js';
import { fetchInterests } from './redux/slices/interests.js';
import { SelectionPage } from './pages/Selection.jsx';
import "./styles/index.scss";
import { fetchFavorites } from './redux/slices/favorites.js';
import { PickingPage } from './pages/Picking.jsx';
import { ChosenLeisurePage } from './pages/ChosenLeisure.jsx';
import { FavoritesPage } from './pages/Favorites.jsx';
import { ProfilePage } from './pages/Profile.jsx';
import { fetchProfile } from './redux/slices/profile.js';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe());
    dispatch(fetchInterests());
    dispatch(fetchFavorites());
    dispatch(fetchProfile());
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path='/' element={ <MainPage />}/>
        <Route path='/auth/login' element={ <LoginPage />}/>
        <Route path='/auth/register' element={ <RegisterPage />}/>
        <Route path='/selection' element={ <SelectionPage />}/>
        <Route path='/criteria' element={ <PickingPage /> }/>
        <Route path='/chosenLeisure' element={ <ChosenLeisurePage /> }/>
        <Route path='/favorites' element={ <FavoritesPage /> }/>
        <Route path='/profile' element={ <ProfilePage /> }/>
      </Routes>
    </Layout>
  );
}

export default App;
