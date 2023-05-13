import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../utils/axios.js';

const initialState = {
  data: null,
  status: 'loading',
};

export const fetchCreateInterests = createAsyncThunk('interests/fetchCreateInterests', async (params) => {
  const { data } = await axios.post('/interests', params).catch(error => error.response);
  
  return data;
});

export const fetchInterests = createAsyncThunk('interests/fetchInterests', async () => {
  const { data } = await axios.get('/interests');

  return data;
});

const interestsSlice = createSlice({
  name: 'interests',
  initialState,
  extraReducers: {
    [fetchCreateInterests.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchCreateInterests.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded'
    },
    [fetchCreateInterests.rejected]: (state, action) => {
      state.data = null;
      state.status = action.message;
    },
    [fetchInterests.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchInterests.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded'
    },
    [fetchInterests.rejected]: (state, action) => {
      state.data = null;
      state.status = action.message;
    }
  }
});

export const selectIsNewUser = (state) => !state.interests.data?.interests;

export const interestsReducer = interestsSlice.reducer;