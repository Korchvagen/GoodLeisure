import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../utils/axios.js';

const initialState = {
  data: null,
  status: 'loading',
};

export const fetchLeisures = createAsyncThunk('leisures/fetchLeisures', async (params) => {
  const { data } = await axios.post('/leisures', params).catch(error => error.response);
  
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
    }
  }
});

export const selectLeisures = (state) => state.leisures.data?.leisures;

export const leisuresReducer = leisuresSlice.reducer;