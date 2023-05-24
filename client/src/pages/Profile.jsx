import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/pages/profile.scss';
import { selectInterests } from '../redux/slices/interests.js';
import { Popup } from '../components/popup/Popup.jsx';
import { EditInfo } from '../components/popup/EditInfo.jsx';
import { EditInterests } from '../components/popup/EditInterests.jsx';


export const ProfilePage = () => {
  const interests = useSelector(selectInterests);
  const [chosenInterests, setChosenInterests] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [isInfoEdit, setIsInfoEdit] = useState(true);
  const initialState = [
    "Еда", "Спорт", "Природа", "Искусство", "Литература",
    "Игры", "Развлечения", "Астрономия", "Животные", "Шопинг",
    "Кино", "Музыка", "Технологии", "Ночная жизнь", "Танцы"
  ];

  useEffect(() => {
    if (interests) {
      setChosenInterests(interests);
    }
  }, [interests]);

  const handleEditClick = (e) => {
    if(e.target.classList.contains('edit-interests')){
      setIsInfoEdit(false);
    }

    setPopupActive(true);
  }

  return (
    <div className="profile-page-wrapper">
      <h2 className='profile-page-wrapper__title'>Личный кабинет</h2>
      <div className="profile-container">
        <div className="profile-container__left-side">
          <div className='info-container'>
            <div className='edit-btn edit-info' onClick={handleEditClick}></div>
            <div className='info-container__avatar'></div>
            <p className='info-container__name'>Имя</p>
            <p className='info-container__city'>Город</p>
          </div>
          <Link className='options-link'>
            <div className="options-link__image"></div>
            <span className="options-link__text">Настройки</span>
          </Link>
        </div>
        <div className="profile-container__interests">
          <div className='edit-btn edit-interests' onClick={handleEditClick}></div>
          <h3 className='interests__title'>Мои интересы</h3>
          <div className="interests__conteiner">
            {initialState.map((value, index) => (
              <div className={chosenInterests.includes(value) ? 'interests__conteiner__item active' : 'interests__conteiner__item'} key={index}><span>{value}</span></div>
            ))}
          </div>
        </div>
      </div>
      <Popup active={popupActive} setActive={setPopupActive}>
        {
          isInfoEdit ? <EditInfo /> : <EditInterests setActive={setPopupActive}/>
        }
      </Popup>
    </div>
  )
}
