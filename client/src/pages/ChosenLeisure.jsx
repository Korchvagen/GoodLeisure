import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchLeisures } from '../redux/slices/leisures.js';
import '../styles/pages/leisures.scss';
import { LeisuresList } from '../components/LeisuresList.jsx';
import { LeisureMap } from '../components/LeisureMap.jsx';
import { setLoading } from '../redux/slices/loader.js';


export const ChosenLeisurePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [category, setCategory] = useState([params.get('leisure')]);
  const [leisures, setLeisures] = useState([]);
  const [listWindow, setListWindow] = useState(true);

  useEffect(() => {
    dispatch(setLoading(true));

    const getLeisures = async () => {
      const values = { interests: category };
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
            <button className='left-links__item leisure-List active' onClick={handleLinkClick}>Список</button>
            <button className='left-links__item leisure-map' onClick={handleLinkClick}>Карта</button>
          </div>
          <Link className='navigation__skip-link' to={'/selection'}>Начать заново</Link>
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
