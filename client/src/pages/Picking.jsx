import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchProposedLeisures } from '../redux/slices/leisures.js';
import '../styles/pages/criteria.scss';
import axios from 'axios';
import { fetchInterests, selectInterests } from '../redux/slices/interests.js';
import { LeisuresList } from '../components/LeisuresList.jsx';
import { LeisureMap } from '../components/LeisureMap.jsx';
import { ProposedLeisure } from '../components/Leisure.jsx';
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
