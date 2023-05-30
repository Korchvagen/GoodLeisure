import React from 'react';
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

function App() {
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
