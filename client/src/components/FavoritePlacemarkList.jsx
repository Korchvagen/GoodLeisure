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
import lodash from 'lodash';
import { PopupLeisureMap } from './popup/PopupLeisureMap.jsx';

export function FavoritePlacemarkList({ data }) {
  const [currentImage, setCurrentImage] = useState("");
  const [popupActive, setPopupActive] = useState(false);
  const [leisure, setLeisure] = useState(null);
  const [favoriteLeisure, setFavoriteLeisure] = useState(true);
  const leisures = useSelector(selectLeisures);
  const favorites = useSelector(selectFavorites);

  const handleClick = (id) => {
    data.forEach(feature => {
      if (feature.leisure.properties.CompanyMetaData.id === id) {
        setLeisure(feature);
      }
    });

    // if (favorites && favorites.includes(Number(id))) {
    //   setFavoriteLeisure(true);
    // }

    setPopupActive(true);
  }

  const placemarkList = data.map(feature => (
    <Placemark key={feature.leisure.properties.CompanyMetaData.id}
      geometry={[feature.leisure.geometry.coordinates[1], feature.leisure.geometry.coordinates[0]]}
      options={{
        iconLayout: 'default#image',
        iconImageHref: getPlacemarkIcon(feature.category),
        iconImageSize: [40, 40],
        iconImageOffset: [-15, -15]
      }}
      onClick={() => handleClick(feature.leisure.properties.CompanyMetaData.id)}
    />
  ));

  return (
    <div>
      {placemarkList}
      {
        leisure
        &&
        <Popup key={leisure.leisure.properties.CompanyMetaData.id} active={popupActive} setActive={setPopupActive}>
          <PopupLeisureMap key={leisure.leisure.properties.CompanyMetaData.id} category={leisure.category} leisure={leisure.leisure} favorite={favoriteLeisure} setActive={setPopupActive}/>
          {/* <PopupLeisure name="Место про еду" address="awd.mawkd2 a88  baw" time="11:00-24:00" phone="+5151351861531" /> */}
        </Popup>
      }
    </div>
  );
}