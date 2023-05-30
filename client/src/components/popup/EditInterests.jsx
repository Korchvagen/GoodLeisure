import React, { useEffect, useState } from 'react';
import "../../styles/popup/popup-content.scss"
import { useDispatch, useSelector } from 'react-redux';
import { fetchEditInterests, selectInterests, selectInterestsError } from '../../redux/slices/interests';
import { setLoading } from '../../redux/slices/loader';
import { useTranslation } from 'react-i18next';
import { selectLanguage } from '../../redux/slices/language';

export function EditInterests({ setActive, setIsInfoEdit }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const chosenLanguage = useSelector(selectLanguage);
  const interests = useSelector(selectInterests);
  const interestsError = useSelector(selectInterestsError);
  const [chosenInterests, setChosenInterests] = useState([]);
  const [chosenInterestsIndex, setChosenInterestsIndex] = useState([]);

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

  useEffect(() => {
    if (interests) {
      setChosenInterests(interests);

      if (initialStateRu.includes(interests[0])) {
        setChosenInterestsIndex(initialStateRu.map((value, index) => {
          if (interests.includes(value)) {
            return index;
          }
        }));
      } else {
        setChosenInterestsIndex(initialStateEn.map((value, index) => {
          if (interests.includes(value)) {
            return index;
          }
        }));
      }
    }
  }, [interests]);

  const handleToggleInterest = (e) => {
    if (chosenInterests.includes(e.target.value)) {
      setChosenInterests((prevInterests) => prevInterests.filter((item) => item !== e.target.value));
    } else {
      setChosenInterests((prevInterests) => [...prevInterests, e.target.value]);
    }

    e.target.classList.toggle('active');
  }

  const submitInterests = async () => {
    dispatch(setLoading(true));
    const values = { interests: chosenInterests };
    const data = await dispatch(fetchEditInterests(values));

    if (!data.payload?.message) {
      setIsInfoEdit(true);
      setActive(false);
    }

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
        {(chosenLanguage === "ru" ? initialStateRu : initialStateEn).map((value, index) =>
          <button className={ (chosenInterestsIndex.includes(index)) ? 'interest-button active' : 'interest-button'}
            key={index} value={value}
            onClick={handleToggleInterest}>{value}
          </button>)}
      </div>
      <button className='container__button save-btn' onClick={submitInterests}>{t('interests.save-btn')}</button>
    </div>
  );
}