import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../utils/axios.js';

const initialState = {
  data: null,
  status: 'loading',
};

export const fetchFavorites = createAsyncThunk('favorites/fetchFavorites', async () => {
  const { data } = await axios.get('/favorites').catch(error => error.response);
  
  return data;
});

export const fetchAddFavorite = createAsyncThunk('favorites/fetchAddFavorite', async (params) => {
  const { data } = await axios.post('/favorites', params).catch(error => error.response);
  
  return data;
});

export const fetchRemoveFavorite = createAsyncThunk('favorites/fetchRemoveFavorite', async (params) => {
  const { data } = await axios.patch('/favorites', params).catch(error => error.response);
  
  return data;
});

const favoritesSlice = createSlice({
  name: 'leisures',
  initialState,
  extraReducers: {
    [fetchFavorites.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchFavorites.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded'
    },
    [fetchFavorites.rejected]: (state, action) => {
      state.data = null;
      state.status = action.message;
    },
    [fetchAddFavorite.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchAddFavorite.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded'
    },
    [fetchAddFavorite.rejected]: (state, action) => {
      state.data = null;
      state.status = action.message;
    },
    [fetchRemoveFavorite.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchRemoveFavorite.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded'
    },
    [fetchRemoveFavorite.rejected]: (state, action) => {
      state.data = null;
      state.status = action.message;
    }
  }
});

export const selectFavorites = (state) => state.favorites.data?.favorites;

export const selectFavoriteError = (state) => state.favorites.data?.message;

export const favoritesReducer = favoritesSlice.reducer;