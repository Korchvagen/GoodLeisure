import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeisures, selectMessage } from '../redux/slices/leisures.js';
import '../styles/pages/leisures.scss';
import { selectInterests } from '../redux/slices/interests.js';
import { LeisuresList } from '../components/LeisuresList.jsx';
import { LeisureMap } from '../components/LeisureMap.jsx';
import { setLoading } from '../redux/slices/loader.js';
import { selectAuth } from '../redux/slices/auth.js';
import { selectCoords } from '../redux/slices/coords.js';
import { selectCity } from '../redux/slices/profile.js';
import { useTranslation } from 'react-i18next';
import { selectLanguage } from '../redux/slices/language.js';

export const SelectionPage = () => {
  const isAuth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const leisureError = useSelector(selectMessage);
  const interests = useSelector(selectInterests);
  const coords = useSelector(selectCoords);
  const city = useSelector(selectCity);
  const chosenLanguage = useSelector(selectLanguage);
  const [proposedLeisures, setProposedLeisures] = useState([]);
  const [listWindow, setListWindow] = useState(true);

  useEffect(() => {
    dispatch(setLoading(true));

    const getLeisures = async () => {
      const values = {
        interests: interests,
        coords: coords,
        city: city,
        lang: chosenLanguage
      };

      const data = await dispatch(fetchLeisures(values));

      if (data.payload?.leisures) {
        setProposedLeisures(data.payload.leisures);
      }
    };

    getLeisures();

    dispatch(setLoading(false));
  }, [city]);

  const handleLinkClick = (e) => {
    dispatch(setLoading(true));

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
            <button className='left-links__item leisure-List active' onClick={handleLinkClick}>{t('selection.list')}</button>
            <button className='left-links__item leisure-map' onClick={handleLinkClick}>{t('selection.map')}</button>
          </div>
          <Link className='navigation__skip-link' to={'/criteria'}>{t('selection.skip-link')}</Link>
        </div>
        <div className="leisures-container__content">
          {
            listWindow
              ?
              <div className="leisure-list-container">
                {
                  leisureError
                  ?
                  <h3 className='empty-result-text'>{ leisureError  }</h3>
                  :
                  proposedLeisures.map((category, index) => (
                    <LeisuresList key={index} index={index} data={category} />
                  ))
                }
              </div>
              :
              <LeisureMap />
          }
        </div>
      </div>
    </div>
  )
}
