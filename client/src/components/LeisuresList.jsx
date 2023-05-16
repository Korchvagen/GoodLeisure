import React from 'react';
import '../styles/leisure.scss';
import { useSelector } from 'react-redux';
import { selectInterests } from '../redux/slices/interests';
import { ProposedLeisure } from './ProposedLeisure';

export function LeisuresList({ index, data }) {
  const interests = useSelector(selectInterests);
  const leisureList = data.features.map(feature => (
    <ProposedLeisure key={feature.properties.CompanyMetaData.id} category={interests[index]} leisure={feature} />
  ));
  console.log(leisureList);

  return (
    <div>
      {leisureList}
    </div>
  );
}