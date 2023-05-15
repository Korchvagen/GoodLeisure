import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchProposedLeisures } from '../redux/slices/leisures.js';
import '../styles/pages/selection.scss';
import axios from 'axios';
import { fetchInterests, selectInterests } from '../redux/slices/interests.js';
import { LeisuresList } from '../components/LeisuresList.jsx';
import { ProposedLeisure } from '../components/ProposedLeisure.jsx';


export const SelectionPage = () => {
  const interests = useSelector(selectInterests);
  const dispatch = useDispatch();
  const [proposedLeisures, setProposedLeisures] = useState([]);

  useEffect(() => {
    // const getData = async () => {
    //   const response = await axios.get(`https://search-maps.yandex.ru/v1/?text=Минск,еда&type=biz&lang=ru_RU&apikey=ad914ddf-71d6-4cfa-bb00-632c413e4113`)
    //   console.log(response.data.features);
    // };
    // getData();
    const fetchLeisures = async () => {
      // const data = await dispatch(fetchProposedLeisures());

      // if (data.payload.length !== 0) {
      //   setProposedLeisures(data.payload);

      //   console.log(data.payload);
      // }
    };

    fetchLeisures();
  }, []);

  return (
    <div className="selection-page-wrapper">
      <div className="selection-container">
        <div className='selection-container__navigation'>
          <div className='navigation__left-links'>
            <Link className='left-links__item active'>Список</Link>
            <Link className='left-links__item'>Карта</Link>
          </div>
          <Link className='navigation__skip-link'>Пропустить</Link>
        </div>
        <div className="selection-container__content">
          {/* {
            proposedLeisures.map((category, index) => (
              <LeisuresList key={index} index={index} data={category}/>
            ))
          } */}
          <div className="leisure-list-container">
            <ProposedLeisure text={"hawdbhab dhabwhdb ahwdbhabwd bjadkawj1o2j 2891 080da jwhdu1 jdфцв"} category={"Литература"} />
            <ProposedLeisure text={"hawdbhab dhabwhdb ahwdbhabwddu1 jda jwbdk1 "} category={"Спорт"} />
            <ProposedLeisure text={"hawdbhab dhabwhdb ahwdbhabwd bjadkawj1o2j 2891 hdu1 jda jwbdk1 "} category={"Еда"} />
            <ProposedLeisure text={"hawdbhab dhabwhdb ahwdbhabwd bjadkawj1o2j 2891 080dajwhdu1 jda jwbdk1 "} category={"Искусство"} />
            <ProposedLeisure text={"hawdbhab dhabwhdb ahwdbhabwd bjadkawj1o2j 2891  jda jwbdk1 "} category={"Кино"} />
            <ProposedLeisure text={"hawdbhab dhabwhdb ahwdbhabwd bjadkawj1o2j 2891 080dajwhdu1 jda jwbdk1 "} category={"Музыка"} />
            <ProposedLeisure text={"hawdbhab dhabwhdb ahwdbhabwd bjadkawj1o2j 2891 080dajwhdu1 jda jwbdk1 вфцвфцв"} category={"Технологии"} />
            <ProposedLeisure text={"hawdbhab dhabwhdb ahwdbhabwd bjadkawj1o2j 2891 080dajwhdu1 jda jwbdk1 вфцвфцвцфв"} category={"Игры"} />
            <ProposedLeisure text={"hawdbhab dhabwhdb ahwdbhabwd bjadkawj1o2j 2891 080jda jwbdk1 "} category={"Развлечения"} />
            <ProposedLeisure text={"hawdbhab dhabwhdb ahwdbhabwd bjadkawj1o2j 289 jda jwbdk1 "} category={"Природа"} />
            <ProposedLeisure text={"hawdbhab dhabwhdb ahwdbhabwd bjadkawj1o2j 2891 080dajwhdu1 jda jwbdk1 "} category={"Животные"} />
            <ProposedLeisure text={"abwd bjadkawj1o2j 2891 080dajwhdu1 jda jwbdk1 "} category={"Шопинг"} />
            <ProposedLeisure text={"hawdbhab dhabwhdb ahwdawj1o2j 2891 080dajwhdu1 jda jwbdk1dawdawd "} category={"Ночная жизнь"} />
            <ProposedLeisure text={"hawdbhab dhabwhdb ahwdbhabwd bjadkawj1o2j 2891 jda jwbdk1 dawdawdaw"} category={"Танцы"} />
            <ProposedLeisure text={"hawdbhab dhabwhdb ahwdbhabwd bjadkawj1o2j 2891 jda jwbdk1d "} category={"Астрономия"} />
          </div>
        </div>
      </div>
    </div>
  )
}
