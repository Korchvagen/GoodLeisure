import React from 'react';
import '../styles/leisure.scss';
import { useSelector } from 'react-redux';
import { selectInterests } from '../redux/slices/interests';
import { Leisure } from './Leisure';

export function LeisuresList({ index, data, category }) {
  const interests = useSelector(selectInterests);
  const leisureList = data.features.map(feature => (
    <Leisure key={feature.properties.CompanyMetaData.id} category={ category ? category : interests[index] } leisure={feature} />
  ));

  return (
    <div>
      {leisureList}
    </div>
  );
}