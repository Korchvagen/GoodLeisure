import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchLeisures, fetchProposedLeisures } from '../redux/slices/leisures.js';
import '../styles/pages/criteria.scss';
import axios from 'axios';
import { fetchInterests, selectInterests } from '../redux/slices/interests.js';
import { LeisuresList } from '../components/LeisuresList.jsx';
import { LeisureMap } from '../components/LeisureMap.jsx';
import { ProposedLeisure } from './Leisure.jsx';


export const Criteria = () => {
  const dispatch = useDispatch();
  const interests = useSelector(selectInterests);
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [selectedCriteria, setSelectedCriteria] = useState([]);
  const [selectedCriteriaImg, setSelectedCriteriaImg] = useState([]);
  const [restart, setRestart] = useState(false);
  const [isLeisuresFetched, setIsLeisuresFetched] = useState(false);
  const [categories, setCategories] = useState([
    "Литература", "Спорт", "Еда", "Искусство", "Кино",
    "Музыка", "Технологии", "Игры", "Развлечения", "Природа",
    "Животные", "Шопинг", "Ночная жизнь", "Танцы", "Астрономия"
  ]);
  const [images, setImages] = useState([
    "literature", "sport", "food", "art", "cinema",
    "music", "technics", "games", "entertainment", "nature",
    "animals", "shopping", "night-life", "dances", "space"
  ]);

  const handleCriterionClick = async (e) => {
    setSelectedCriteria((prevCriteria) => [...prevCriteria, e.target.value]);
    setSelectedCriteriaImg((prevCriteriaImg) => [...prevCriteriaImg, images[categories.indexOf(e.target.value)]])

    if (categories.length === 1) {
      const values = { interests: categories };
      const data = await dispatch(fetchLeisures(values));
      
      if(data.payload?.leisures){
        setIsLeisuresFetched(true);        
      }
    }

    if ((categories.length % 2 === 1 && currentPairIndex === Math.floor(categories.length / 2)) || (categories.length % 2 === 0 && currentPairIndex + 1 === Math.floor(categories.length / 2))) {
      setCurrentPairIndex(0);
      setRestart(true);
    } else {
      setCurrentPairIndex(currentPairIndex + 1);
    }
  }

  const handleAnotherClick = () => {
    if ((categories.length % 2 === 1 && currentPairIndex === Math.floor(categories.length / 2)) || (categories.length % 2 === 0 && currentPairIndex + 1 === Math.floor(categories.length / 2))) {
      setCurrentPairIndex(0);
      setRestart(true);
    } else {
      setCurrentPairIndex(currentPairIndex + 1);
    }
  };

  useEffect(() => {
    if (restart) {
      setCategories(selectedCriteria);
      setImages(selectedCriteriaImg);
      setSelectedCriteria([]);
      setSelectedCriteriaImg([]);
      setRestart(false);
    }

    if(categories.length === 0){
      console.log('oops....')
    }
  });

  if(isLeisuresFetched){
    return <Navigate to={`/chosenLeisure?leisure=${categories[0]}`} />;
  }

  return (
    <>
      <div className={`criteria-container__image ${images[currentPairIndex * 2]}`}></div>
      <div className="criteria-container__buttons">
        <div className='buttons__criteria'>
          <button className='criterion-btn first-criterion' value={categories[currentPairIndex * 2]} onClick={handleCriterionClick}>{categories[currentPairIndex * 2]}</button>
          {
            categories[currentPairIndex * 2 + 1]
            &&
            <>
              <p className='buttons__criteria__vs'>vs</p>
              <button className='criterion-btn second-criterion' value={categories[currentPairIndex * 2 + 1]} onClick={handleCriterionClick}>{categories[currentPairIndex * 2 + 1]}</button>
            </>
          }
        </div>
        <button className='another-btn' onClick={handleAnotherClick}>Другое</button>
      </div>
      {
        categories[currentPairIndex * 2 + 1]
        &&
        <div className={`criteria-container__image ${images[currentPairIndex * 2 + 1]}`}></div>
      }
    </>
  )
}
