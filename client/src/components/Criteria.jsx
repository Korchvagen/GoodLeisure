import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchLeisures } from '../redux/slices/leisures.js';
import '../styles/pages/criteria.scss';
import { setLoading } from '../redux/slices/loader.js';


export const Criteria = () => {
  const dispatch = useDispatch();
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [selectedCriteria, setSelectedCriteria] = useState([]);
  const [selectedCriteriaImg, setSelectedCriteriaImg] = useState([]);
  const [restart, setRestart] = useState(false);
  const [isLeisuresFetched, setIsLeisuresFetched] = useState(false);
  const [isEmptyChoice, setEmptyChoice] = useState(false);

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
    dispatch(setLoading(true));

    setSelectedCriteria((prevCriteria) => [...prevCriteria, e.target.value]);
    setSelectedCriteriaImg((prevCriteriaImg) => [...prevCriteriaImg, images[categories.indexOf(e.target.value)]])

    if (categories.length === 1) {
      const values = { interests: categories };
      const data = await dispatch(fetchLeisures(values));

      if (data.payload?.leisures) {
        setIsLeisuresFetched(true);
      }
    }

    if ((categories.length % 2 === 1 && currentPairIndex === Math.floor(categories.length / 2)) || (categories.length % 2 === 0 && currentPairIndex + 1 === Math.floor(categories.length / 2))) {
      setCurrentPairIndex(0);
      setRestart(true);
    } else {
      setCurrentPairIndex(currentPairIndex + 1);
    }

    dispatch(setLoading(false));
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

    if (categories.length === 0) {
      setEmptyChoice(true);
    }
  });

  if (isLeisuresFetched) {
    return <Navigate to={`/chosenLeisure?leisure=${categories[0]}`} />;
  }

  return (
    <>
      {
        isEmptyChoice
          ?
          <h3 className='empty-choice-text'>К сожалению, Вы ничего не выбрали</h3>
          :
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
      }
    </>
  )
}
