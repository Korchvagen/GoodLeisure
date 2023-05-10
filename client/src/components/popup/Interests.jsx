import React from 'react';
import { InterestButton } from './InterestButton.jsx';
import "../../styles/popup-content.scss"

export function Interests(){
  return (
    <div className='popup-content'>
      <h2 className='popup-content__title'>Выбор интересов</h2>
      <p className='container__text'>Выберите то, чем вы увлекаетесь, чтобы мы помогли Вам определиться, как провести свободное время</p>
      <div className='container__buttons'>
        <InterestButton text={"Еда"}/>
        <InterestButton text={"Спорт"}/>
        <InterestButton text={"Природа"}/>
        <InterestButton text={"Искусство"}/>
        <InterestButton text={"Литература"}/>
        <InterestButton text={"Игры"}/>
        <InterestButton text={"Развлечения"}/>
        <InterestButton text={"Астрономия"}/>
        <InterestButton text={"Животные"}/>
        <InterestButton text={"Шопинг"}/>
        <InterestButton text={"Кино"}/>
        <InterestButton text={"Музыка"}/>
        <InterestButton text={"Технологии"}/>
        <InterestButton text={"Ночная жизнь"}/>
        <InterestButton text={"Танцы"}/>
      </div>
      <button className='popup-content-container__button'>Сохранить</button>
    </div>
  );
}