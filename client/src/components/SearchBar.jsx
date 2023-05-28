import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Interests } from './popup/Interests.jsx';
import sliderImage from '../assets/img/slider-1.png';
import { selectAuth } from '../redux/slices/auth.js';
import { selectIsNewUser } from '../redux/slices/interests.js';
import { PopupInterests } from './popup/PopupInterests.jsx';
import '../styles/pages/main.scss';
import { fetchSearchLeisures, selectSearchError } from '../redux/slices/leisures.js';

export const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isSuccessSearch, setSuccessSearch] = useState(false);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessSearch(true);
  };

  if (isSuccessSearch) {
    return <Navigate to={`/search?request=${searchValue}`} />
  }

  return (
    <form className='search-form' onSubmit={handleSubmit}>
      <button type='submit' className='search-form__button'></button>
      <input type="text" placeholder='Поиск...' value={searchValue} onChange={handleSearchChange} />
    </form>
  );
}
