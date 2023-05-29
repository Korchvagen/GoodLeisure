import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/pages/options.scss';
import avatarIcon from '../assets/icons/avatar.png';
import { selectInterests } from '../redux/slices/interests.js';
import { Popup } from '../components/popup/Popup.jsx';
import { EditInfo } from '../components/popup/EditInfo.jsx';
import { EditInterests } from '../components/popup/EditInterests.jsx';
import { selectCity, selectImage, selectName } from '../redux/slices/profile';
import { EditEmail } from '../components/popup/EditEmail';
import { EditPassword } from '../components/popup/EditPassword';
import { DeleteAccount } from '../components/popup/DeleteAccount';
import { logout } from '../redux/slices/auth';


export const OptionsPage = () => {
  const dispatch = useDispatch();
  const [popupActive, setPopupActive] = useState(false);
  const [isEmailbutton, setEmailbutton] = useState(true);
  const [isPasswordButton, setPasswordButton] = useState(false);
  const [isExitButton, setExitButton] = useState(false);

  const handleButtonClick = (e) => {
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
  }

  if(isExitButton){
    dispatch(logout());
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
