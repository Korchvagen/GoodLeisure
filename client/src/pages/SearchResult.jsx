import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchLeisures, selectMessage } from '../redux/slices/leisures.js';
import '../styles/pages/leisures.scss';
import { Leisure } from '../components/Leisure.jsx';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { selectFavorites } from '../redux/slices/favorites.js';
import { Popup } from '../components/popup/Popup.jsx';
import { PopupLeisureMap } from '../components/popup/PopupLeisureMap.jsx';
import { setLoading } from '../redux/slices/loader.js';
import { selectAuth } from '../redux/slices/auth.js';
import { selectCoords } from '../redux/slices/coords.js';
import { selectCity } from '../redux/slices/profile.js';
import { useTranslation } from 'react-i18next';
import { selectLanguage } from '../redux/slices/language.js';


export const SearchResultPage = () => {
  const isAuth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const chosenLanguage = useSelector(selectLanguage);
  const searchError = useSelector(selectMessage);
  const favorites = useSelector(selectFavorites);
  const coords = useSelector(selectCoords);
  const city = useSelector(selectCity);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [request, setRequest] = useState([params.get('request')]);
  const [leisures, setLeisures] = useState([]);
  const [listWindow, setListWindow] = useState(true);
  const [leisure, setLeisure] = useState(null);
  const [favoriteLeisure, setFavoriteLeisure] = useState(false);
  const [popupActive, setPopupActive] = useState(false);
  const [isEmpryResult, setEmptyResult] = useState(false);

  useEffect(() => {
    dispatch(setLoading(true));

    const getLeisures = async () => {
      const value = {
        searchRequest: request,
        coords: coords,
        city: city,
        lang: chosenLanguage
      };

      const data = await dispatch(fetchSearchLeisures(value));

      if (data.payload?.message) {
        setEmptyResult(true);
      }

      if (data.payload?.leisures) {
        setLeisures(data.payload.leisures);

        if (data.payload.leisures.length === 0) {
          setEmptyResult(true);
        }
      }

      dispatch(setLoading(false));
    };

    getLeisures();
  }, [request]);

  const handleLinkClick = (e) => {
    if (e.target.classList.contains('leisure-map')) {
      setListWindow(false);

      document.querySelector('.leisure-List').classList.remove('active');
      e.target.classList.add('active');
      document.querySelector('.leisures-container__content').classList.add('map');
    } else {
      setListWindow(true);

      document.querySelector('.leisures-container__content').classList.remove('map');
      document.querySelector('.leisure-map').classList.remove('active');
      e.target.classList.add('active');
    }
  }

  const handleClick = (id) => {
    dispatch(setLoading(true));

    leisures.forEach(feature => {
      if (feature.properties.CompanyMetaData.id === id) {
        setLeisure(feature);
      }
    });

    favorites.forEach(favorite => {
      if (favorite.leisure.properties.CompanyMetaData.id === id) {
        setFavoriteLeisure(true);
      }
    });

    setPopupActive(true);
    dispatch(setLoading(false));
  }

  if (!isAuth) {
    return <Navigate to="/auth/login" />
  }

  return (
    <div className="leisures-page-wrapper">
      <div className="leisures-container">
        <div className='leisures-container__navigation'>
          <div className='navigation__left-links'>
            <button className='left-links__item leisure-List active' onClick={handleLinkClick}>{t('search-result.list')}</button>
            <button className='left-links__item leisure-map' onClick={handleLinkClick}>{t('search-result.map')}</button>
          </div>
        </div>
        <div className="leisures-container__content">
          {
            listWindow
              ?
              <div className="leisure-list-container">
                {
                  isEmpryResult
                    ?
                    <h3 className='empty-result-text'>{searchError ? searchError : t('search-result.empty-result-text')}</h3>
                    :
                    leisures.map(feature => (
                      <Leisure key={feature.properties.CompanyMetaData.id} category={"Поиск"} leisure={feature} />
                    ))
                }
              </div>
              :
              <YMaps className='map-container'>
                <Map className='map' defaultState={{ center: coords ? [coords[1], coords[0]] : [53.9, 27.5667], zoom: 12 }}>
                  {
                    leisures.map(feature => (
                      <Placemark key={feature.properties.CompanyMetaData.id}
                        geometry={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}
                        options={{
                          iconLayout: 'default#image',
                          iconImageHref: 'https://img.icons8.com/color/48/search--v1.png',
                          iconImageSize: [40, 40],
                          iconImageOffset: [-15, -15]
                        }}
                        onClick={() => handleClick(feature.properties.CompanyMetaData.id)}
                      />
                    ))
                  }
                </Map>
              </YMaps>
          }
          {
            leisure
            &&
            <Popup key={leisure.properties.CompanyMetaData.id} active={popupActive} setActive={setPopupActive}>
              <PopupLeisureMap key={leisure.properties.CompanyMetaData.id} leisure={leisure} category={"Поиск"} favorite={favoriteLeisure} />
            </Popup>
          }
        </div>
      </div>
    </div>
  )
}
