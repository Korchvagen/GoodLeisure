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
  const marks = [{ id: 123, coord: [53.894029, 27.566449]}, { id: 1234, coord: [53.912288, 27.560544]}];
  
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
        {/* {
          leisures.map(category => {
            category.features.map(leisure => (
              <Placemark key={leisure.properties.CompanyMetaData.id} id={leisure.properties.CompanyMetaData.id} geometry={[leisure.geometry.coordinates[1], leisure.geometry.coordinates[0]]} />
            ))
          })
        } */}
        {/* {
          marks.map(mark => (
            <Placemark key={mark.id} geometry={mark.coord}/>
          ))
        } */}
        {/* <Placemark key={1} defaultGeometry={[53.912288, 27.560544]}/> */}
      </Map>
    </YMaps>
  );
}