import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import '../styles/pages/options.scss';
import { Popup } from '../components/popup/Popup.jsx';
import { EditEmail } from '../components/popup/EditEmail';
import { EditPassword } from '../components/popup/EditPassword';
import { DeleteAccount } from '../components/popup/DeleteAccount';
import { resetAuth } from '../redux/slices/auth';
import { setLoading } from '../redux/slices/loader';
import { resetInterests } from '../redux/slices/interests';
import { resetFavorites } from '../redux/slices/favorites';
import { resetLeisures } from '../redux/slices/leisures';
import { resetProfile } from '../redux/slices/profile';
import { resetCoords } from '../redux/slices/coords';


export const OptionsPage = () => {
  const dispatch = useDispatch();
  const [popupActive, setPopupActive] = useState(false);
  const [isEmailbutton, setEmailbutton] = useState(true);
  const [isPasswordButton, setPasswordButton] = useState(false);
  const [isExitButton, setExitButton] = useState(false);

  const handleButtonClick = (e) => {
    dispatch(setLoading(true));

    if(e.target.value === "email"){
      setEmailbutton(true);
      setPasswordButton(false);
    } else if(e.target.value === "password"){
      setEmailbutton(false);
      setPasswordButton(true);
    } else if(e.target.value === "delete"){
      setEmailbutton(false);
      setPasswordButton(false);
    } else {
      setExitButton(true);
    }

    setPopupActive(true);

    dispatch(setLoading(false));
  }

  if(isExitButton){
    dispatch(resetAuth());
    dispatch(resetInterests());
    dispatch(resetLeisures());
    dispatch(resetFavorites());
    dispatch(resetProfile());
    dispatch(resetCoords(null));
    window.localStorage.removeItem('token');
    return <Navigate to="/" />
  }

  return (
    <div className="options-page-wrapper">
      <h2 className='options-page-wrapper__title'>Настройки</h2>
      <div className="options-container">
        <div className="profile-container__image"></div>
        <div className="profile-container__menu">
          <button className='menu__button' value={"email"} onClick={handleButtonClick}>Изменить электронную почту</button>
          <button className='menu__button' value={"password"} onClick={handleButtonClick}>Изменить пароль</button>
          <button className='menu__button' value={"delete"} onClick={handleButtonClick}>Удалить учетную запись</button>
          <button className='menu__button' onClick={handleButtonClick}>Выйти</button>
        </div>
      </div>
      <Popup active={popupActive} setActive={setPopupActive} >
          { isEmailbutton && <EditEmail setActive={setPopupActive}/> }
          { isPasswordButton && <EditPassword setActive={setPopupActive}/> }
          { (!isEmailbutton && !isPasswordButton) && <DeleteAccount />}
      </Popup>
    </div>
  )
}
