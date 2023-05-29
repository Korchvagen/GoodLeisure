import React, { useState } from 'react';
import { Popup } from "./popup/Popup.jsx";
import { useDispatch } from 'react-redux';
import '../styles/leisure.scss';
import { Placemark } from '@pbe/react-yandex-maps';
import { getPlacemarkIcon } from '../scripts/getPlacemarkIcon.js';
import { PopupLeisureMap } from './popup/PopupLeisureMap.jsx';
import { setLoading } from '../redux/slices/loader.js';

export function FavoritePlacemarkList({ data }) {
  const dispatch = useDispatch();
  const [popupActive, setPopupActive] = useState(false);
  const [leisure, setLeisure] = useState(null);
  const [favoriteLeisure, setFavoriteLeisure] = useState(true);

  const handleClick = (id) => {
    data.forEach(feature => {
      if (feature.leisure.properties.CompanyMetaData.id === id) {
        setLeisure(feature);
      }
    });

    setPopupActive(true);
  }

  dispatch(setLoading(true));

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

  dispatch(setLoading(false));

  return (
    <div>
      {placemarkList}
      {
        leisure
        &&
        <Popup key={leisure.leisure.properties.CompanyMetaData.id} active={popupActive} setActive={setPopupActive}>
          <PopupLeisureMap key={leisure.leisure.properties.CompanyMetaData.id} category={leisure.category} leisure={leisure.leisure} favorite={favoriteLeisure} setActive={setPopupActive}/>
        </Popup>
      }
    </div>
  );
}