import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../utils/axios.js';

const initialState = {
  data: null,
  status: 'loaded',
};

export const fetchLeisures = createAsyncThunk('leisures/fetchLeisures', async (params) => {
  const { data } = await axios.post('/leisures', params).catch(error => error.response);
  
  return data;
});

export const fetchSearchLeisures = createAsyncThunk('leisures/fetchSearchLeisures', async (params) => {
  const { data } = await axios.post('/leisures/search', params).catch(error => error.response);
  
  return data;
});

const leisuresSlice = createSlice({
  name: 'leisures',
  initialState,
  extraReducers: {
    [fetchLeisures.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchLeisures.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded'
    },
    [fetchLeisures.rejected]: (state, action) => {
      state.data = null;
      state.status = action.message;
    },
    [fetchSearchLeisures.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchSearchLeisures.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded'
    },
    [fetchSearchLeisures.rejected]: (state, action) => {
      state.data = null;
      state.status = action.message;
    }
  }
});

export const selectLeisures = (state) => state.leisures.data?.leisures;

export const selectMessage = (state) => state.leisures.data?.message;

export const leisuresReducer = leisuresSlice.reducer;