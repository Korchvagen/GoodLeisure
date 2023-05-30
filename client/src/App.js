import React, { useEffect } from 'react';
import { Layout } from './components/Layout.jsx';
import { Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/Main.jsx';
import { LoginPage } from './pages/Login.jsx';
import { RegisterPage } from './pages/Register.jsx';
import { SelectionPage } from './pages/Selection.jsx';
import "./styles/index.scss";
import { PickingPage } from './pages/Picking.jsx';
import { ChosenLeisurePage } from './pages/ChosenLeisure.jsx';
import { FavoritesPage } from './pages/Favorites.jsx';
import { ProfilePage } from './pages/Profile.jsx';
import { SearchResultPage } from './pages/SearchResult.jsx';
import { OptionsPage } from './pages/Options.jsx';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'
import { useDispatch } from 'react-redux';
import { fetchAuthMe } from './redux/slices/auth.js';
import { fetchInterests } from './redux/slices/interests.js';
import { fetchFavorites } from './redux/slices/favorites.js';
import { fetchProfile } from './redux/slices/profile.js';
import { setCoords } from './redux/slices/coords.js';
import { useTranslation } from 'react-i18next';
import { setLanguage } from './redux/slices/language.js';

function App() {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  useEffect(() => {
    dispatch(fetchAuthMe());
    dispatch(fetchInterests());
    dispatch(fetchFavorites());
    dispatch(fetchProfile());

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch(setCoords([position.coords.longitude, position.coords.latitude]));
      });
    }

    const initialLanguage = window.localStorage.getItem('lang') || "ru";
    i18n.changeLanguage(initialLanguage);
    dispatch(setLanguage(initialLanguage));
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <Layout>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/auth/login' element={<LoginPage />} />
          <Route path='/auth/register' element={<RegisterPage />} />
          <Route path='/selection' element={<SelectionPage />} />
          <Route path='/criteria' element={<PickingPage />} />
          <Route path='/chosenLeisure' element={<ChosenLeisurePage />} />
          <Route path='/favorites' element={<FavoritesPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/search' element={<SearchResultPage />} />
          <Route path='/options' element={<OptionsPage />} />
        </Routes>
      </Layout>
    </I18nextProvider>
  );
}

export default App;
