import React from 'react';
import "../../styles/popup/popup-leisure.scss"
import { useDispatch } from 'react-redux';
import { fetchAddFavorite, fetchRemoveFavorite } from '../../redux/slices/favorites';
import { setLoading } from '../../redux/slices/loader';

export function PopupLeisureMap({ category, leisure, favorite, setActive }) {
  const dispatch = useDispatch();
  const contactsList = leisure.properties.CompanyMetaData.Phones?.map((phone, index) => <li key={index}>{phone.formatted}</li>)

  const handleLeisureClick = async (e) => {
    dispatch(setLoading(true));

    if (e.target.classList.contains('active')) {
      const value = {
        favorite: {
          category: category,
          leisure: leisure
        }
      };

      const data = await dispatch(fetchRemoveFavorite(value))

      if (data.payload.favorites) {
        e.target.classList.remove('active');
        if(window.location.pathname === '/favorites'){
          setActive(false);
        }
      }
    } else {
      const value = {
        favorite: {
          category: category,
          leisure: leisure
        }
      };

      const data = await dispatch(fetchAddFavorite(value))

      if (data.payload.favorites) {
        e.target.classList.add('active');
      }
    }

    dispatch(setLoading(false));
  };

  return (
    <div className='leisure-info-container'>
      <button
        className={favorite ? 'leisure-container__favorite-btn popup-favorite-btn active' : 'leisure-container__favorite-btn popup-favorite-btn'}
        value={leisure.properties.CompanyMetaData.id}
        onClick={handleLeisureClick}>
      </button>
      <h4 className='popup-content__title'>{leisure.properties.name}</h4>
      <p className='leisure-info-container__address'>{leisure.properties.CompanyMetaData.address}</p>
      <p className='leisure-info-container__time'>{leisure.properties.CompanyMetaData.Hours?.text}</p>
      <ul className='leisure-info-container__contacts'>{contactsList}</ul>
      {
        leisure.properties.CompanyMetaData.url
        &&
        <a className='leisure-site-btn' href={leisure.properties.CompanyMetaData.url} target='_blanck'>Перейти на сайт</a>
      }
    </div>
  );
}