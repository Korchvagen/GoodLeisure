import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import '../styles/pages/main.scss';

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
