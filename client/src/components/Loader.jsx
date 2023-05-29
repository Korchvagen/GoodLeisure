import React from 'react';
import { useSelector } from 'react-redux';
import "../styles/loader.scss";
import { selectLoadingStatus } from '../redux/slices/loader.js';

export function Loader(){
  const isLoading = useSelector(selectLoadingStatus);

  return (
    <div className={ isLoading ? 'loader active' : 'loader' }>
      <div className='loader__spinner'></div>
    </div>
  );
}