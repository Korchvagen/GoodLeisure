import React, { useState } from 'react';
import "../../styles/popup/popup-content.scss"
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreateInterests, selectInterestsError } from '../../redux/slices/interests';
import { setLoading } from '../../redux/slices/loader';
import { selectLanguage } from '../../redux/slices/language';
import { useTranslation } from 'react-i18next';

export function Interests() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const chosenLanguage = useSelector(selectLanguage);
  const interestsError = useSelector(selectInterestsError);

  const initialStateRu = [
    "Еда", "Спорт", "Природа", "Искусство", "Литература",
    "Игры", "Развлечения", "Астрономия", "Животные", "Шопинг",
    "Кино", "Музыка", "Технологии", "Ночная жизнь", "Танцы"
  ];

  const initialStateEn = [
    "Food", "Sport", "Nature", "Art", "Literature",
    "Games", "Entertainment", "Space", "Animals", "Shopping",
    "Cinema", "Cinema", "Technologies", "Nightlife", "Dances"
  ];

  const [chosenInterest, setChosenInterest] = useState([]);

  const handleToggleInterest = (e) => {
    if(chosenInterest.includes(e.target.value)){
      setChosenInterest((prevInterests) => prevInterests.filter((item) => item !== e.target.value));
    } else {
      setChosenInterest((prevInterests) => [...prevInterests, e.target.value]);
    }
    
    e.target.classList.toggle('active');
  }

  const submitInterests = async () => {
    dispatch(setLoading(true));
    const values = { interests: chosenInterest };
    await dispatch(fetchCreateInterests(values));

    dispatch(setLoading(false));
  }

  return (
    <div className='popup-content'>
      <h2 className='popup-content__title'>{t('interests.title')}</h2>
      {
        interestsError && <p className='error-message'>{interestsError}</p>
      }
      <p className='container__text'>{t('interests.text')}</p>
      <div className='container__buttons'>
        {(chosenLanguage === "ru" ? initialStateRu : initialStateEn).map((value, index) => <button className='interest-button' key={index} value={value} onClick={handleToggleInterest}>{value}</button>)}
      </div>
      <button className='container__button save-btn' onClick={submitInterests}>{t('interests.save-btn')}</button>
    </div>
  );
}