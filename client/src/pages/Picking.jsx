import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/criteria.scss';
import { Criteria } from '../components/Criteria.jsx';


export const PickingPage = () => {
  return (
    <div className="criteria-page-rwapper">
      <p className='text-instruction'>Выберите один из критериев, который больше всего подходит Вам в данный момент</p>
      <p className='text-question'>Как Вы желаете провести свой досуг?</p>
      <div className="criteria-container">
        <Criteria />
      </div>
      <Link className='stop-selection-link' to={'/'}>Завершить подбор</Link>
    </div>
  )
}
