import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../utils/axios.js';

const initialState = {
  data: null,
  status: 'loading',
};

export const fetchProposedLeisures = createAsyncThunk('leisures/fetchProposedLeisures', async () => {
  const { data } = await axios.get('/leisures/proposed').catch(error => error.response);
  
  return data;
});

const leisuresSlice = createSlice({
  name: 'leisures',
  initialState,
  extraReducers: {
    [fetchProposedLeisures.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchProposedLeisures.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded'
    },
    [fetchProposedLeisures.rejected]: (state, action) => {
      state.data = null;
      state.status = action.message;
    }
  }
});

export const leisuresReducer = leisuresSlice.reducer;