import React from 'react';
import '../styles/languages.scss';

export function Languages(){
  return (
    <div className="languages-container">
      <span className='languages-container__ru active'>Ru</span>
      <span>/</span>
      <span className='languages-container__en'>En</span>
    </div>
  );
}