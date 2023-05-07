import React from 'react';
import { InterestButton } from './InterestButton.jsx';
import "../styles/interests.scss"

export function Interests(){
  return (
    <div className='interests-container'>
      <h2 className='title'>Выбор интересов</h2>
      <p className='text'>Выберите то, чем вы увлекаетесь, чтобы мы помогли Вам определиться, как провести свободное время</p>
      <div className='buttons-conteiner'>
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
      <button className='save-button'>Сохранить</button>
    </div>
  );
}