import React, { useState } from 'react';
import "../../styles/popup/popup-leisure.scss"

export function PopupLeisure({ data }) {
  const contactsList = data.properties.CompanyMetaData.Phones?.map(phone => <li>{phone.formatted}</li>)

  return (
    <div className='leisure-info-container'>
      <button className='leisure-container__favorite-btn popup-favorite-btn' value={data.properties.CompanyMetaData.id}></button>
      <h4 className='popup-content__title'>{data.properties.name}</h4>
      {/* <h4 className='popup-content__title'>{name}</h4> */}
      <p className='leisure-info-container__address'>{data.properties.CompanyMetaData.address}</p>
      {/* <p className='leisure-info-container__address'>{address}</p> */}
      <p className='leisure-info-container__time'>{data.properties.CompanyMetaData.Hours?.text}</p>
      {/* <p className='leisure-info-container__time'>{time}</p> */}
      {/* <p className='container__text contacts'>{ data.properties.CompanyMetaData.Phones?.map(phone => phone.formatted).join(', ') }</p> */}
      <ul className='leisure-info-container__contacts'>{contactsList}</ul>
      {/* <p className='leisure-info-container__contacts'>{phone}</p> */}
      {
        data.properties.CompanyMetaData.url
        &&
        <a className='leisure-site-btn' href={data.properties.CompanyMetaData.url} target='_blanck'>Перейти на сайт</a>
      }
      {/* <a className='leisure-site-btn' href="" target='_blanck'>Перейти на сайт</a> */}
    </div>
  );
}