import React from 'react'
import { useSelector } from 'react-redux';
import { Interests } from '../components/popup/Interests.jsx';
import sliderImage from '../assets/img/slider-1.png';
import { selectAuth } from '../redux/slices/auth.js';
import { selectIsNewUser } from '../redux/slices/interests.js';
import { PopupInterests } from '../components/popup/PopupInterests.jsx';
import '../styles/main-page.scss';

export const MainPage = () => {
  const isAuth = useSelector(selectAuth)
  const isNewUser = useSelector(selectIsNewUser)

  let isPopupActive = false;

  if (isAuth && isNewUser) {
    isPopupActive = true;
  }

  return (
    <div className='main-page-wrapper'>
      <div className='main-page-wrapper__content'>
        <div className='content__left-side'>
          <div className='left-side__search-container'>
            <div className='search-container__image'></div>
            <input type="text" placeholder='Поиск...' />
          </div>
          <p className='left-side__text'>GoodLeisure - это сервис для тех, кто любит отдыхать, занимаясь  любимым делом, или ищет для себя что-то новенькое в сфере досуга.
            Данный сервис обладает системой учета интересов пользователя, поэтому мы всегда поможем вам с выбором, как провести свободное время. Чтобы не потерять из виду заинтересовавший
            вариант досуга, Вы можете сохранить его в раздел Избранное. Там Вы быстро найдете свои любимые занятия.
            Также мы встроили в наше детище Яндекс.Карту. Благодаря ей Вы можете визуально видеть расположение всех подходящих Вам мест проведения досуга.
          </p>
          <button className='left-side__start-btn'>Начать подбор</button>
        </div>
        <div className='content__slider'>
          <div className="slider-container">
            <div className='slider-container__images'>
              <img src={sliderImage} alt="Slider Image" />
            </div>
          </div>
          <div className='slider__buttons'>
            <div className='slider__buttons__item active'></div>
            <div className='slider__buttons__item'></div>
            <div className='slider__buttons__item'></div>
            <div className='slider__buttons__item'></div>
            <div className='slider__buttons__item'></div>
          </div>
        </div>
      </div>
      <p className='description-text'>Процесс подбора способов проведения досуга осуществляется путем последовательного выбора критериев желаемого досуга.
        По окончанию процесса подбора Вам будет предложен список возможных вариантов Вашего отдыха.
      </p>
      <PopupInterests active={isPopupActive}>
        <Interests />
      </PopupInterests>
    </div>
  );
}
