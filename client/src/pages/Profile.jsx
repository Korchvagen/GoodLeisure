import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/pages/profile.scss';
import avatarIcon from '../assets/icons/avatar.png';
import { selectInterests } from '../redux/slices/interests.js';
import { Popup } from '../components/popup/Popup.jsx';
import { EditInfo } from '../components/popup/EditInfo.jsx';
import { EditInterests } from '../components/popup/EditInterests.jsx';
import { selectCity, selectImage, selectName } from '../redux/slices/profile';
import { setLoading } from '../redux/slices/loader';
import { useTranslation } from 'react-i18next';
import { selectLanguage } from '../redux/slices/language';

export const ProfilePage = () => {
  const { t } = useTranslation();
  const chosenLanguage = useSelector(selectLanguage);
  const image = useSelector(selectImage);
  const name = useSelector(selectName);
  const city = useSelector(selectCity);
  const interests = useSelector(selectInterests);
  const [profileImage, setProfileImage] = useState("");
  const [profileName, setProfileName] = useState("");
  const [profileCity, setProfileCity] = useState("");
  const [chosenInterests, setChosenInterests] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [isInfoEdit, setIsInfoEdit] = useState(true);

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
    setProfileImage(image);
    setProfileName(name);
    setProfileCity(city);

    if (interests) {
      if (initialStateRu.includes(interests[0])) {
        setChosenInterests(initialStateRu.map((value, index) => {
          if (interests.includes(value)) {
            return index;
          }
        }));
      } else {
        setChosenInterests(initialStateEn.map((value, index) => {
          if (interests.includes(value)) {
            return index;
          }
        }));
      }
    }
  }, [image, name, city, interests]);

  const handleEditClick = (e) => {
    if (e.target.classList.contains('edit-interests')) {
      setIsInfoEdit(false);
    }

    setPopupActive(true);
  }

  return (
    <div className="profile-page-wrapper">
      <h2 className='profile-page-wrapper__title'>{t('profile.title')}</h2>
      <div className="profile-container">
        <div className="profile-container__left-side">
          <div className='info-container'>
            <div className='edit-btn edit-info' onClick={handleEditClick}></div>
            <div className='info-container__frame'>
              <img src={profileImage ? `data:image/png;base64,${profileImage}` : avatarIcon} alt="Chosen Image" className="info-container__image" />
            </div>
            <p className='info-container__name'>{profileName ? profileName : t('profile.name')}</p>
            <p className='info-container__city'>{profileCity ? profileCity : t('profile.city')}</p>
          </div>
          <Link className='options-link' to="/options">
            <div className="options-link__image"></div>
            <span className="options-link__text">{t('profile.options')}</span>
          </Link>
        </div>
        <div className="profile-container__interests">
          <div className='edit-btn edit-interests' onClick={handleEditClick}></div>
          <h3 className='interests__title'>{t('profile.interests-title')}</h3>
          <div className="interests__conteiner">
            {(chosenLanguage === "ru" ? initialStateRu : initialStateEn).map((value, index) => (
              <div className={chosenInterests.includes(index) ? 'interests__conteiner__item active' : 'interests__conteiner__item'} key={index}><span>{value}</span></div>
            ))}
          </div>
        </div>
      </div>
      <Popup active={popupActive} setActive={setPopupActive} setIsInfoEdit={setIsInfoEdit}>
        {
          isInfoEdit ? <EditInfo setActive={setPopupActive} /> : <EditInterests setActive={setPopupActive} setIsInfoEdit={setIsInfoEdit} />
        }
      </Popup>
    </div>
  )
}
