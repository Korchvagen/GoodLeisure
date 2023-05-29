import React, { useEffect, useState } from 'react';
import "../../styles/popup/popup-content.scss"
import { useDispatch, useSelector } from 'react-redux';
import { fetchEditInterests, selectInterests, selectInterestsError } from '../../redux/slices/interests';
import { setLoading } from '../../redux/slices/loader';

export function EditInterests({ setActive, setIsInfoEdit }) {
  const dispatch = useDispatch();
  const interests = useSelector(selectInterests);
  const interestsError = useSelector(selectInterestsError);
  const initialState = [
    "Еда", "Спорт", "Природа", "Искусство", "Литература",
    "Игры", "Развлечения", "Астрономия", "Животные", "Шопинг",
    "Кино", "Музыка", "Технологии", "Ночная жизнь", "Танцы"
  ];
  const [chosenInterest, setChosenInterest] = useState([]);

  useEffect(() => {
    setChosenInterest(interests);
  }, [interests]);

  const handleToggleInterest = (e) => {
    if (chosenInterest.includes(e.target.value)) {
      setChosenInterest((prevInterests) => prevInterests.filter((item) => item !== e.target.value));
    } else {
      setChosenInterest((prevInterests) => [...prevInterests, e.target.value]);
    }

    e.target.classList.toggle('active');
  }

  const submitInterests = async () => {
    dispatch(setLoading(true));
    const values = { interests: chosenInterest };
    const data = await dispatch(fetchEditInterests(values));

    if (!data.payload?.message) {
      setIsInfoEdit(true);
      setActive(false);
    }

    dispatch(setLoading(false));
  }

  return (
    <div className='popup-content'>
      <h2 className='popup-content__title'>Выбор интересов</h2>
      {
        interestsError && <p className='error-message'>{interestsError}</p>
      }
      <p className='container__text'>Выберите то, чем Вы увлекаетесь, чтобы мы помогли Вам определиться, как провести свободное время</p>
      <div className='container__buttons'>
        {initialState.map((value, index) =>
          <button className={ (chosenInterest && chosenInterest.includes(value)) ? 'interest-button active' : 'interest-button'}
            key={index} value={value}
            onClick={handleToggleInterest}>{value}
          </button>)}
      </div>
      <button className='container__button save-btn' onClick={submitInterests}>Сохранить</button>
    </div>
  );
}