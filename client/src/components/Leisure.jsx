import React, { useEffect, useState } from 'react';
import { Popup } from "./popup/Popup.jsx";
import { PopupLeisure } from './popup/PopupLeisure.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddFavorite, fetchRemoveFavorite, selectFavoriteError, selectFavorites } from '../redux/slices/favorites.js';
import '../styles/leisure.scss';
import { setActiveFavorites } from '../scripts/setActiveFavorites.js';
import lodash, { indexOf } from 'lodash';
import { setLoading } from '../redux/slices/loader.js';
import { selectLanguage } from '../redux/slices/language.js';

export function Leisure({ category, leisure }) {
  const dispatch = useDispatch();
  const chosenLanguage = useSelector(selectLanguage);
  const favoriteError = useSelector(selectFavoriteError);
  const favorites = useSelector(selectFavorites);
  const [popupActive, setPopupActive] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("");
  const [favoriteLeisure, setFavoriteLeisure] = useState(false);
  const ruCategories = ["литература", "спорт", "еда", "искусство", "кино", "музыка", "технологии", "игры", "развлечения", "природа", "животные", "шопинг", "ночная жизнь", "танцы", "астрономия", "поиск"];
  const enCategories = ["literature", "sport", "food", "art", "cinema", "music", "technics", "games", "entertainment", "nature", "animals", "shopping", "night-life", "dances", "space", "search"];

  useEffect(() => {
    document.querySelectorAll('.favorite-error').forEach(el => el.textContent = "");
    
    setCurrentCategory(ruCategories.includes(category.toLowerCase()) ? enCategories[ruCategories.indexOf(category.toLowerCase())] : enCategories.find(elem => elem === category.toLowerCase()));
  }, []);

  console.log(currentCategory);

  useEffect(() => {
    dispatch(setLoading(true));

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

    dispatch(setLoading(false));
  })

  const handleLeisureClick = async (e) => {
    dispatch(setLoading(true));

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

    dispatch(setLoading(false));
  };

  return (
    <div id={leisure.properties.CompanyMetaData.id} className='leisure-container' onClick={handleLeisureClick}>
      <div className='leisure-container__left-side'>
        <div className={`left-side__image ${currentCategory}`}></div>
        <div className="left-side__info">
          <h3 className='info__name'>{leisure.properties.name}</h3>
          <p className='info__text'>{leisure.properties.CompanyMetaData.address + ". " + leisure.properties.CompanyMetaData?.Hours?.text}</p>
          {favoriteError && <p className='favorite-error'>{favoriteError}</p>}
        </div>
      </div>
      <button className='leisure-container__favorite-btn'></button>
      <Popup key={leisure.properties.CompanyMetaData.id} active={popupActive} setActive={setPopupActive}>
        <PopupLeisure key={leisure.properties.CompanyMetaData.id} category={category} leisure={leisure} favorite={favoriteLeisure} />
      </Popup>
    </div>
  );
}