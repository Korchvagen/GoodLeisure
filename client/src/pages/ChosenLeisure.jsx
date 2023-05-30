import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeisures } from '../redux/slices/leisures.js';
import '../styles/pages/leisures.scss';
import { LeisuresList } from '../components/LeisuresList.jsx';
import { LeisureMap } from '../components/LeisureMap.jsx';
import { setLoading } from '../redux/slices/loader.js';
import { selectCoords } from '../redux/slices/coords.js';
import { selectCity } from '../redux/slices/profile.js';
import { useTranslation } from 'react-i18next';

export const ChosenLeisurePage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const location = useLocation();
  const coords = useSelector(selectCoords);
  const city = useSelector(selectCity);
  const params = new URLSearchParams(location.search);
  const [category, setCategory] = useState([params.get('leisure')]);
  const [leisures, setLeisures] = useState([]);
  const [listWindow, setListWindow] = useState(true);

  useEffect(() => {
    dispatch(setLoading(true));

    const getLeisures = async () => {
      const values = {
        interests: category,
        coords: coords,
        city: city
      };
      const data = await dispatch(fetchLeisures(values));

      if (data.payload?.leisures) {
        setLeisures(data.payload.leisures);
      }

      dispatch(setLoading(false));
    };

    getLeisures();
  }, [category]);

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

  return (
    <div className="leisures-page-wrapper">
      <div className="leisures-container">
        <div className='leisures-container__navigation'>
          <div className='navigation__left-links'>
            <button className='left-links__item leisure-List active' onClick={handleLinkClick}>{t('chosen-leisure.list')}</button>
            <button className='left-links__item leisure-map' onClick={handleLinkClick}>{t('chosen-leisure.map')}</button>
          </div>
          <Link className='navigation__skip-link' to={'/selection'}>{t('chosen-leisure.restart-link')}</Link>
        </div>
        <div className="leisures-container__content">
          {
            listWindow
              ?
              <div className="leisure-list-container">
                {
                  leisures.map((leisures, index) => (
                    <LeisuresList key={index} index={index} data={leisures} category={category[0]} />
                  ))
                }
              </div>
              :
              <LeisureMap category={category[0]} />
          }
        </div>
      </div>
    </div>
  )
}
