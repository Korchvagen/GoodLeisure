import React, { useState } from 'react';
import "../../styles/popup/popup-content.scss"
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreateInterests, selectInterestsError } from '../../redux/slices/interests';

export function Interests() {
  const dispatch = useDispatch();
  const interestsError = useSelector(selectInterestsError);

  const initialState = [
    "Еда", "Спорт", "Природа", "Искусство", "Литература",
    "Игры", "Развлечения", "Астрономия", "Животные", "Шопинг",
    "Кино", "Музыка", "Технологии", "Ночная жизнь", "Танцы"
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
    const values = { interests: chosenInterest };
    const data = await dispatch(fetchCreateInterests(values));

    if(data.payload.interests){
      
    }
  }

  return (
    <div className='popup-content'>
      <h2 className='popup-content__title'>Выбор интересов</h2>
      {
        interestsError && <p className='error-message'>{interestsError}</p>
      }
      <p className='container__text'>Выберите то, чем вы увлекаетесь, чтобы мы помогли Вам определиться, как провести свободное время</p>
      <div className='container__buttons'>
        {initialState.map((value, index) => <button className='interest-button' key={index} value={value} onClick={handleToggleInterest}>{value}</button>)}
      </div>
      <button className='container__button save-btn' onClick={submitInterests}>Сохранить</button>
    </div>
  );
}