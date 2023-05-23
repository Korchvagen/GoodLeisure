import React, { useState } from 'react';
import "../../styles/popup/popup-leisure.scss"
import { useDispatch } from 'react-redux';
import { fetchAddFavorite, fetchRemoveFavorite } from '../../redux/slices/favorites';

export function PopupLeisure({ data, favorite }) {
  const dispatch = useDispatch();
  const contactsList = data.properties.CompanyMetaData.Phones?.map((phone, index) => <li key={index}>{phone.formatted}</li>)

  const handleLeisureClick = async (e) => {
    if (e.target.classList.contains('active')) {
      const value = { favorite: e.target.value };
      const data = await dispatch(fetchRemoveFavorite(value))

      if (data.payload.favorites) {
        e.target.classList.remove('active');
        document.getElementById(e.target.value).querySelector('.leisure-container__favorite-btn').classList.remove('active');
      }
    } else {
      // const value = { favorite: e.target.parentElement.id };
      const value = { favorite: e.target.value };

      const data = await dispatch(fetchAddFavorite(value))

      if (data.payload.favorites) {
        e.target.classList.add('active');
        document.getElementById(e.target.value).querySelector('.leisure-container__favorite-btn').classList.add('active');
      }
    }
  };

  return (
    <div className='leisure-info-container'>
      <button
        className={favorite ? 'leisure-container__favorite-btn popup-favorite-btn active' : 'leisure-container__favorite-btn popup-favorite-btn'}
        value={data.properties.CompanyMetaData.id}
        onClick={handleLeisureClick}>
      </button>
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