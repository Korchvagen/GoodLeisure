import React, { useState } from 'react';
import { YMaps, Map } from '@pbe/react-yandex-maps';
import '../styles/map.scss';
import { useSelector } from 'react-redux';
import { selectLeisures } from '../redux/slices/leisures.js';
import { PlacemarkList } from './PlacemarkList.jsx';
import { selectInterests } from '../redux/slices/interests';
import { FavoritePlacemarkList } from './FavoritePlacemarkList';
import { selectCoords } from '../redux/slices/coords';

export function LeisureMap({ favorites, category }) {
  const leisures = useSelector(selectLeisures);
  const interests = useSelector(selectInterests);
  const coords = useSelector(selectCoords);
  
  return (
    <YMaps className='map-container'>
      <Map className='map' defaultState={{ center: [coords[1], coords[0]], zoom: 12 }}>
        {
          favorites
          ?
            <FavoritePlacemarkList data={favorites}/>
          :
          leisures.map((feature, index) => (
            <PlacemarkList key={index} data={feature} category={ category ? category : interests[index]}/>
          ))
        }
      </Map>
    </YMaps>
  );
}