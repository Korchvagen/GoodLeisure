import React, { useEffect } from 'react'
import { createSlider, handleSliderButtonClick } from '../scripts/slider.js';
import '../styles/pages/main.scss';

export const Slider = () => {
  useEffect(() => createSlider(), []);
  
  return (
    <div className='content__slider'>
      <div className="slider-container">
        <div className='slider-container__images'></div>
      </div>
      <div className='slider__buttons'>
        <button className='slider__buttons__item active' value={1} onClick={handleSliderButtonClick}></button>
        <button className='slider__buttons__item' value={2} onClick={handleSliderButtonClick}></button>
        <button className='slider__buttons__item' value={3} onClick={handleSliderButtonClick}></button>
        <button className='slider__buttons__item' value={4} onClick={handleSliderButtonClick}></button>
        <button className='slider__buttons__item' value={5} onClick={handleSliderButtonClick}></button>
      </div>
    </div>
  );
}
