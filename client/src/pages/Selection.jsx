import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeisures } from '../redux/slices/leisures.js';
import '../styles/pages/leisures.scss';
import { selectInterests } from '../redux/slices/interests.js';
import { LeisuresList } from '../components/LeisuresList.jsx';
import { LeisureMap } from '../components/LeisureMap.jsx';
import { setLoading } from '../redux/slices/loader.js';


export const SelectionPage = () => {
  const dispatch = useDispatch();
  const interests = useSelector(selectInterests);
  const [proposedLeisures, setProposedLeisures] = useState([]);
  const [listWindow, setListWindow] = useState(true);

  useEffect(() => {
    dispatch(setLoading(true));
    
    const getLeisures = async () => {
      const values = { interests: interests };
      const data = await dispatch(fetchLeisures(values));

      if (data.payload?.leisures) {
        setProposedLeisures(data.payload.leisures);
        dispatch(setLoading(false));
      }
    };

    getLeisures();
  }, [interests]);

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

    dispatch(setLoading(true));
  }

  return (
    <div className="leisures-page-wrapper">
      <div className="leisures-container">
        <div className='leisures-container__navigation'>
          <div className='navigation__left-links'>
            <button className='left-links__item leisure-List active' onClick={handleLinkClick}>Список</button>
            <button className='left-links__item leisure-map' onClick={handleLinkClick}>Карта</button>
          </div>
          <Link className='navigation__skip-link' to={'/criteria'}>Пропустить</Link>
        </div>
        <div className="leisures-container__content">
          {
            listWindow
              ?
              <div className="leisure-list-container">
                {
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
