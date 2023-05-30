import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/structure/header/languages.scss';
import { useDispatch } from 'react-redux';
import { setLanguage } from '../redux/slices/language';

export function Languages() {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const ruBtn = useRef(null);
  const enBtn = useRef(null)

  const handleChangeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);

    if (e.target.classList.contains('ru')) {
      ruBtn.current.classList.add('active');
      enBtn.current.classList.remove('active');
    } else {
      ruBtn.current.classList.remove('active');
      enBtn.current.classList.add('active');
    }

    dispatch(setLanguage(e.target.value));
    window.localStorage.setItem('lang', e.target.value);
  };

  return (
    <div className="languages-container">
      <button ref={ruBtn}
        className={
          window.localStorage.getItem('lang') === "ru" ?
            'languages-container__btn ru active'
            :
            'languages-container__btn ru'}
        value="ru"
        onClick={handleChangeLanguage}>
        Ru
      </button>
      <span>/</span>
      <button ref={enBtn} className={
        window.localStorage.getItem('lang') === "en" ?
          'languages-container__btn active'
          :
          'languages-container__btn'}
        value="en"
        onClick={handleChangeLanguage}>
        En
      </button>
    </div>
  );
}