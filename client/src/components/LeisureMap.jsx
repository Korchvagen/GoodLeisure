import React from 'react';
import { YMaps, Map } from '@pbe/react-yandex-maps';
import '../styles/map.scss';
import { useSelector } from 'react-redux';
import { selectLeisures } from '../redux/slices/leisures.js';
import { PlacemarkList } from './PlacemarkList.jsx';
import { selectInterests } from '../redux/slices/interests';
import { FavoritePlacemarkList } from './FavoritePlacemarkList';

export function LeisureMap({ favorites, category }) {
  const leisures = useSelector(selectLeisures);
  const interests = useSelector(selectInterests);
  
  return (
    <YMaps className='map-container'>
      <Map className='map' defaultState={{ center: [53.9, 27.5667], zoom: 12 }}>
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