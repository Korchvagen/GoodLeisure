import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchFavoriteLeisures, fetchLeisures } from '../redux/slices/leisures.js';
import '../styles/pages/leisures.scss';
import axios from 'axios';
import { fetchInterests, selectInterests } from '../redux/slices/interests.js';
import { LeisuresList } from '../components/LeisuresList.jsx';
import { LeisureMap } from '../components/LeisureMap.jsx';
import { ProposedLeisure } from '../components/Leisure.jsx';
import { selectFavorites } from '../redux/slices/favorites.js';


export const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const [listWindow, setListWindow] = useState(true);
  const [leisures, setLeisures] = useState([]);

  useEffect(() => {
    const getLeisures = async () => {
      const values = { favorites: favorites };
      const data = await dispatch(fetchFavoriteLeisures(values));

      if(data.payload?.leisures){
        setLeisures(data.payload.leisures)
      }
    };

    getLeisures();
  }, [favorites]);

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
                  leisures.map((category, index) => (
                    <LeisuresList key={index} index={index} data={category} />
                  ))
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
              <LeisureMap />
          }
        </div>
      </div>
    </div>
  )
}
