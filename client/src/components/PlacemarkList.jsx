import React, { useEffect, useState } from 'react';
import { Popup } from "./popup/Popup.jsx";
import { PopupLeisure } from './popup/PopupLeisure.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddFavorite, fetchRemoveFavorite, selectFavoriteError, selectFavorites } from '../redux/slices/favorites.js';
import '../styles/leisure.scss';
import { setActiveFavorites } from '../scripts/setActiveFavorites.js';
import { Placemark } from '@pbe/react-yandex-maps';
import { getPlacemarkIcon } from '../scripts/getPlacemarkIcon.js';
import { selectLeisures } from '../redux/slices/leisures.js';
import { PopupLeisureMap } from './popup/PopupLeisureMap.jsx';
import lodash from 'lodash';

export function PlacemarkList({ data, category }) {
  const [currentImage, setCurrentImage] = useState("");
  const [popupActive, setPopupActive] = useState(false);
  const [leisure, setLeisure] = useState(null);
  const [favoriteLeisure, setFavoriteLeisure] = useState(false);
  const leisures = useSelector(selectLeisures);
  const favorites = useSelector(selectFavorites);

  useEffect(() => {
    setCurrentImage(getPlacemarkIcon(category));
  }, []);

  const handleClick = (id) => {
    leisures.forEach(category => {
      category.features.forEach(feature => {
        if (feature.properties.CompanyMetaData.id === id) {
          setLeisure(feature);
        }
      });
    });

    favorites.forEach(favorite => {
      if(favorite.leisure.properties.CompanyMetaData.id === id){
        setFavoriteLeisure(true);
      }
    });

    setPopupActive(true);
  }

  const placemarkList = data.features.map(feature => (
    <Placemark key={feature.properties.CompanyMetaData.id}
      geometry={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}
      options={{
        iconLayout: 'default#image',
        iconImageHref: currentImage,
        iconImageSize: [40, 40],
        iconImageOffset: [-15, -15]
      }}
      onClick={() => handleClick(feature.properties.CompanyMetaData.id)}
    />
  ));

  return (
    <div>
      {placemarkList}
      {
        leisure
        &&
        <Popup key={leisure.properties.CompanyMetaData.id} active={popupActive} setActive={setPopupActive}>
          <PopupLeisureMap key={leisure.properties.CompanyMetaData.id} leisure={leisure} category={category} favorite={favoriteLeisure} />
          {/* <PopupLeisure name="Место про еду" address="awd.mawkd2 a88  baw" time="11:00-24:00" phone="+5151351861531" /> */}
        </Popup>
      }
    </div>
  );
}