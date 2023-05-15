import React, { useEffect, useState } from 'react';
import '../styles/leisure.scss';

export function ProposedLeisure({ category, text }) {
  const [currentCategory, setCurrentCategory] = useState("");
  const ruCategories = ["Литература", "Спорт", "Еда", "Искусство", "Кино", "Музыка", "Технологии", "Игры", "Развлечения", "Природа", "Животные", "Шопинг", "Ночная жизнь", "Танцы", "Астрономия"];
  const enCategories = ["literature", "sport", "food", "art", "cinema", "music", "technics", "games", "entertainment", "nature", "animals", "shopping", "night-life", "dances", "space"];

  useEffect(() => {
    setCurrentCategory(enCategories[ruCategories.indexOf(category)]);
  }, []);

  return (
    // <div id={data.properties.CompanyMetaData.id} className='leisure-container'>
    <div className='leisure-container'>
      <div className='leisure-container__left-side'>
        <div className={`left-side__image ${currentCategory}`}></div>
        <div className="left-side__info">
          {/* <h3 className='info__name'>{data.properties.name}</h3> */}
          <h3 className='info__name'>Место про еду</h3>
          {/* <p className='info__text'>{data.properties.CompanyMetaData.address + ". " + data.properties.CompanyMetaData?.Hours?.text}</p> */}
          <p className='info__text'>{text}</p>
        </div>
      </div>
      <button className='leisure-container__favorite-btn'></button>
    </div>
  );
}