import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Interests } from '../components/popup/Interests.jsx';
import { fetchAuthMe, selectAuth, selectIsNewUser } from '../redux/slices/auth.js';
import { fetchInterests } from '../redux/slices/interests.js';
import { PopupInterests } from '../components/popup/PopupInterests.jsx';
import '../styles/pages/main.scss';
import { SearchBar } from '../components/SearchBar.jsx';
import { useTranslation } from 'react-i18next';
import { fetchFavorites } from '../redux/slices/favorites.js';
import { fetchProfile } from '../redux/slices/profile.js';
import { setCoords } from '../redux/slices/coords.js';
import { Slider } from '../components/Slider.jsx';

export const MainPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  let isPopupActive = false;
  const isAuth = useSelector(selectAuth);
  const isNewUser = useSelector(selectIsNewUser);

  if (isAuth && isNewUser) {
    isPopupActive = true;
  }

  useEffect(() => {
    if(isNewUser){
      dispatch(fetchAuthMe());
      dispatch(fetchInterests());
      dispatch(fetchFavorites());
      dispatch(fetchProfile());
  
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          dispatch(setCoords([position.coords.longitude, position.coords.latitude]));
        });
      }
    }
  }, []);

  return (
    <div className='main-page-wrapper'>
      <div className='main-page-wrapper__content'>
        <div className='content__left-side'>
          <div className='left-side__search-container'>
            <SearchBar />
          </div>
          <p className='left-side__text'>{t('main.upper-text')}</p>
          <Link to={"/selection"} className='left-side__start-btn'>{t('main.selection-btn')}</Link>
        </div>
        <Slider />
      </div>
      <p className='description-text'>{t('main.lower-text')}</p>
      <PopupInterests active={isPopupActive}>
        <Interests />
      </PopupInterests>
    </div>
  );
}
