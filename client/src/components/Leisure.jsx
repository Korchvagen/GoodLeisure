import React, { useEffect, useState } from 'react';
import { Popup } from "./popup/Popup.jsx";
import { PopupLeisure } from './popup/PopupLeisure.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddFavorite, fetchRemoveFavorite, selectFavoriteError, selectFavorites } from '../redux/slices/favorites.js';
import '../styles/leisure.scss';
import { setActiveFavorites } from '../scripts/setActiveFavorites.js';
import lodash from 'lodash';

export function Leisure({ category, leisure }) {
  const dispatch = useDispatch();
  const favoriteError = useSelector(selectFavoriteError);
  const favorites = useSelector(selectFavorites);
  const [popupActive, setPopupActive] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("");
  const [favoriteLeisure, setFavoriteLeisure] = useState(false);
  const ruCategories = ["Литература", "Спорт", "Еда", "Искусство", "Кино", "Музыка", "Технологии", "Игры", "Развлечения", "Природа", "Животные", "Шопинг", "Ночная жизнь", "Танцы", "Астрономия"];
  const enCategories = ["literature", "sport", "food", "art", "cinema", "music", "technics", "games", "entertainment", "nature", "animals", "shopping", "night-life", "dances", "space"];

  useEffect(() => {
    setCurrentCategory(enCategories[ruCategories.indexOf(category)]);
  }, []);

  useEffect(() => {
    if (favorites && favorites.length > 0) {
      const feature = {
        category: category,
        leisure: leisure
      }

      favorites.forEach(favorite => {
        if(lodash.isEqual(favorite, feature)){
          setActiveFavorites(leisure.properties.CompanyMetaData.id);
        }
      });
    }
  })

  const handleLeisureClick = async (e) => {
    if (e.target.className === "leisure-container__favorite-btn") {
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
    } else if (e.target.className === "leisure-container__favorite-btn active") {
      const value = {
        favorite: {
          category: category,
          leisure: leisure
        }
      };

      const data = await dispatch(fetchRemoveFavorite(value))

      if (data.payload.favorites) {
        e.target.classList.remove('active');
      }
    } else if (e.target.className === "popup-background active") {
      setPopupActive(false);
    } else {
      if (e.currentTarget.querySelector('.leisure-container__favorite-btn').classList.contains('active')) {
        setFavoriteLeisure(true);
      }

      setPopupActive(true);
    }
  };

  return (
    <div id={leisure.properties.CompanyMetaData.id} className='leisure-container' onClick={handleLeisureClick}>
      {/* <div id={id} className='leisure-container' onClick={handleLeisureClick}> */}
      <div className='leisure-container__left-side'>
        <div className={`left-side__image ${currentCategory}`}></div>
        <div className="left-side__info">
          <h3 className='info__name'>{leisure.properties.name}</h3>
          {/* <h3 className='info__name'>Место про еду</h3> */}
          <p className='info__text'>{leisure.properties.CompanyMetaData.address + ". " + leisure.properties.CompanyMetaData?.Hours?.text}</p>
          {favoriteError && <p className='favorite-error'>{favoriteError}</p>}
          {/* <p className='info__text'>{text}</p> */}
        </div>
      </div>
      <button className='leisure-container__favorite-btn'></button>
      <Popup key={leisure.properties.CompanyMetaData.id} active={popupActive} setActive={setPopupActive}>
        <PopupLeisure key={leisure.properties.CompanyMetaData.id} category={category} leisure={leisure} favorite={favoriteLeisure} />
        {/* <PopupLeisure name="Место про еду" address="awd.mawkd2 a88  baw" time="11:00-24:00" phone="+5151351861531" /> */}
      </Popup>
    </div>
  );
}