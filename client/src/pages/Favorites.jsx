import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/pages/leisures.scss';
import { LeisureMap } from '../components/LeisureMap.jsx';
import { Leisure } from '../components/Leisure.jsx';
import { selectFavorites } from '../redux/slices/favorites.js';
import { setLoading } from '../redux/slices/loader.js';

export const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const [listWindow, setListWindow] = useState(true);
  const [leisures, setLeisures] = useState([]);

  useEffect(() => {
    if(favorites){
      setLeisures(favorites);
    }
  }, [favorites]);

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

  const leisureList = leisures.map(favorite => (
    <Leisure key={favorite.leisure.properties.CompanyMetaData.id} category={favorite.category} leisure={favorite.leisure} />
  ));

  return (
    <div className="leisures-page-wrapper favorites-wrapper">
      <h2 className='favorites-title'>Избранное</h2>
      <div className="leisures-container">
        <div className='leisures-container__navigation'>
          <div className='navigation__left-links'>
            <button className='left-links__item leisure-List active' onClick={handleLinkClick}>Список</button>
            <button className='left-links__item leisure-map' onClick={handleLinkClick}>Карта</button>
          </div>
        </div>
        <div className="leisures-container__content">
          {
            listWindow
              ?
              <div className="leisure-list-container">
                {
                  leisures.length === 0
                  ?
                  <h3 className='favorites-empty-text'>Ваш список пуст</h3>
                  :
                  leisureList
                }
              </div>
              :
              <LeisureMap favorites={leisures}/>
          }
        </div>
      </div>
    </div>
  )
}
