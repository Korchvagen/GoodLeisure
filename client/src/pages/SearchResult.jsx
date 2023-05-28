import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchLeisures, fetchSearchLeisures, selectLeisures, selectSearchError } from '../redux/slices/leisures.js';
import '../styles/pages/leisures.scss';
import axios from 'axios';
import { fetchInterests, selectInterests } from '../redux/slices/interests.js';
import { LeisuresList } from '../components/LeisuresList.jsx';
import { LeisureMap } from '../components/LeisureMap.jsx';
import { Leisure, ProposedLeisure } from '../components/Leisure.jsx';
import { Placemark } from '@pbe/react-yandex-maps';
import { YMaps, Map } from '@pbe/react-yandex-maps';
import { PlacemarkList } from '../components/PlacemarkList.jsx';
import { selectFavorites } from '../redux/slices/favorites.js';
import { Popup } from '../components/popup/Popup.jsx';
import { PopupLeisureMap } from '../components/popup/PopupLeisureMap.jsx';


export const SearchResultPage = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [request, setrRequest] = useState([params.get('request')]);
  const [leisures, setLeisures] = useState([]);
  const [listWindow, setListWindow] = useState(true);
  const [leisure, setLeisure] = useState(null);
  const [favoriteLeisure, setFavoriteLeisure] = useState(false);
  const [popupActive, setPopupActive] = useState(false);
  const [isEmpryResult, setEmptyResult] = useState(false);

  useEffect(() => {
    const getLeisures = async () => {
      const value = { searchRequest: request };
      const data = await dispatch(fetchSearchLeisures(value));

      if(data.payload?.message){
        setEmptyResult(true);
      }

      if (data.payload?.leisures) {
        setLeisures(data.payload.leisures);

        if(data.payload.leisures.length === 0){
          setEmptyResult(true);
        }
      }
    };

    getLeisures();
  }, [request]);

  const handleLinkClick = (e) => {
    if (e.target.classList.contains('leisure-map')) {
      setListWindow(false);

      document.querySelector('.leisure-List').classList.remove('active');
      e.target.classList.add('active');
      document.querySelector('.leisures-container__content').classList.add('map');
    } else {
      setListWindow(true);

      document.querySelector('.leisures-container__content').classList.remove('map');
      document.querySelector('.leisure-map').classList.remove('active');
      e.target.classList.add('active');
    }
  }

  const handleClick = (id) => {
    leisures.forEach(feature => {
      if (feature.properties.CompanyMetaData.id === id) {
        setLeisure(feature);
      }
    });

    favorites.forEach(favorite => {
      if (favorite.leisure.properties.CompanyMetaData.id === id) {
        setFavoriteLeisure(true);
      }
    });

    setPopupActive(true);
  }


  return (
    <div className="leisures-page-wrapper">
      <div className="leisures-container">
        <div className='leisures-container__navigation'>
          <div className='navigation__left-links'>
            <button className='left-links__item leisure-List active' onClick={handleLinkClick}>Список</button>
            <button className='left-links__item leisure-map' onClick={handleLinkClick}>Карта</button>
          </div>
        </div>
        <div className="leisures-container__content">
          {
            listWindow
              ?
              <div className="leisure-list-container">
                {
                  isEmpryResult
                    ?
                    <h3 className='empty-result-text'>По Вашему запросу ничего не найдено</h3>
                    :
                    <>
                      {
                        leisures.map(feature => (
                          <Leisure key={feature.properties.CompanyMetaData.id} category={"Поиск"} leisure={feature} />
                        ))
                      }
                    </>
                }
                {/* <ProposedLeisure id={"1512830981"} text={"hawdbhab dhabwhdb ahwdbhabwd bjadkawj1o2j 2891 080da jwhdu1 jdфцв"} category={"Литература"} />
                <ProposedLeisure id={"90177522222"} text={"hawdbhab dhabwhdb ahwdbhabwddu1 jda jwbdk1 "} category={"Спорт"} />
                <ProposedLeisure id={"1022724181"} text={"hawdbhab dhabwhdb ahwdbhabwd bjadkawj1o2j 2891 hdu1 jda jwbdk1 "} category={"Еда"} />
                <ProposedLeisure id={"233587203205"} text={"hawdbhab dhabwhdb ahwdbhabwd bjadkawj1o2j 2891 080dajwhdu1 jda jwbdk1 "} category={"Искусство"} />
                <ProposedLeisure id={"66478054992"} text={"hawdbhab dhabwhdb ahwdbhabwd bjadkawj1o2j 2891  jda jwbdk1 "} category={"Кино"} />
                <ProposedLeisure id={"1232432804"} text={"hawdbhab dhabwhdb ahwdbhabwd bjadkawj1o2j 2891 080dajwhdu1 jda jwbdk1 "} category={"Музыка"} />
                <ProposedLeisure text={"hawdbhab dhabwhdb ahwdbhabwd bjadkawj1o2j 2891 080dajwhdu1 jda jwbdk1 вфцвфцв"} category={"Технологии"} />
                <ProposedLeisure text={"hawdbhab dhabwhdb ahwdbhabwd bjadkawj1o2j 2891 080dajwhdu1 jda jwbdk1 вфцвфцвцфв"} category={"Игры"} />
                <ProposedLeisure text={"hawdbhab dhabwhdb ahwdbhabwd bjadkawj1o2j 2891 080jda jwbdk1 "} category={"Развлечения"} />
                <ProposedLeisure text={"hawdbhab dhabwhdb ahwdbhabwd bjadkawj1o2j 289 jda jwbdk1 "} category={"Природа"} />
                <ProposedLeisure text={"hawdbhab dhabwhdb ahwdbhabwd bjadkawj1o2j 2891 080dajwhdu1 jda jwbdk1 "} category={"Животные"} />
                <ProposedLeisure text={"abwd bjadkawj1o2j 2891 080dajwhdu1 jda jwbdk1 "} category={"Шопинг"} />
                <ProposedLeisure text={"hawdbhab dhabwhdb ahwdawj1o2j 2891 080dajwhdu1 jda jwbdk1dawdawd "} category={"Ночная жизнь"} />
                <ProposedLeisure text={"hawdbhab dhabwhdb ahwdbhabwd bjadkawj1o2j 2891 jda jwbdk1 dawdawdaw"} category={"Танцы"} />
                <ProposedLeisure text={"hawdbhab dhabwhdb ahwdbhabwd bjadkawj1o2j 2891 jda jwbdk1d "} category={"Астрономия"} /> */}
              </div>
              :
              <YMaps className='map-container'>
                <Map className='map' defaultState={{ center: [53.9, 27.5667], zoom: 12 }}>
                  {
                    leisures.map(feature => (
                      <Placemark key={feature.properties.CompanyMetaData.id}
                        geometry={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}
                        options={{
                          iconLayout: 'default#image',
                          iconImageHref: 'https://img.icons8.com/color/48/search--v1.png',
                          iconImageSize: [40, 40],
                          iconImageOffset: [-15, -15]
                        }}
                        onClick={() => handleClick(feature.properties.CompanyMetaData.id)}
                      />
                    ))
                  }
                </Map>
              </YMaps>
          }
          {
            leisure
            &&
            <Popup key={leisure.properties.CompanyMetaData.id} active={popupActive} setActive={setPopupActive}>
              <PopupLeisureMap key={leisure.properties.CompanyMetaData.id} leisure={leisure} category={"Поиск"} favorite={favoriteLeisure} />
              {/* <PopupLeisure name="Место про еду" address="awd.mawkd2 a88  baw" time="11:00-24:00" phone="+5151351861531" /> */}
            </Popup>
          }
        </div>
      </div>
    </div>
  )
}
