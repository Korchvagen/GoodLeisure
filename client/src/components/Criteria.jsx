import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeisures } from '../redux/slices/leisures.js';
import '../styles/pages/criteria.scss';
import { setLoading } from '../redux/slices/loader.js';
import { useTranslation } from 'react-i18next';
import { selectLanguage } from '../redux/slices/language.js';

export const Criteria = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const chosenLanguage = useSelector(selectLanguage);
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [selectedCriteria, setSelectedCriteria] = useState([]);
  const [selectedCriteriaImg, setSelectedCriteriaImg] = useState([]);
  const [restart, setRestart] = useState(false);
  const [isLeisuresFetched, setIsLeisuresFetched] = useState(false);
  const [isEmptyChoice, setEmptyChoice] = useState(false);

  const initialStateRu = [
    "Еда", "Спорт", "Природа", "Искусство", "Литература",
    "Игры", "Развлечения", "Астрономия", "Животные", "Шопинг",
    "Кино", "Музыка", "Технологии", "Ночная жизнь", "Танцы"
  ];

  const initialStateEn = [
    "Food", "Sport", "Nature", "Art", "Literature",
    "Games", "Entertainment", "Space", "Animals", "Shopping",
    "Cinema", "Music", "Technologies", "Nightlife", "Dances"
  ];

  const [categories, setCategories] = useState(chosenLanguage === "ru" ? initialStateRu : initialStateEn);

  const [images, setImages] = useState([
    "food", "sport", "nature", "art", "literature",
    "games", "entertainment", "space", "animals", "shopping",
    "cinema", "music", "technics", "night-life", "dances"
  ]);

  const handleCriterionClick = async (e) => {
    dispatch(setLoading(true));

    setSelectedCriteria((prevCriteria) => [...prevCriteria, e.target.value]);
    setSelectedCriteriaImg((prevCriteriaImg) => [...prevCriteriaImg, images[categories.indexOf(e.target.value)]])

    if (categories.length === 1) {
      setIsLeisuresFetched(true);
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

  useEffect(() => {
    chosenLanguage === "ru" ? setCategories(initialStateRu) : setCategories(initialStateEn);
  }, [chosenLanguage]);

  if (isLeisuresFetched) {
    return <Navigate to={`/chosenLeisure?leisure=${categories[0]}`} />;
  }

  return (
    <>
      {
        isEmptyChoice
          ?
          <h3 className='empty-choice-text'>{t('criteria.empty-choice-text')}</h3>
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
              <button className='another-btn' onClick={handleAnotherClick}>{t('criteria.another-btn')}</button>
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
