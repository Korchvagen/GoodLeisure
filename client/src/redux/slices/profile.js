import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../utils/axios.js';

const initialState = {
  data: null,
  status: 'loading',
};

export const fetchEditProfile = createAsyncThunk('profile/fetchEditProfile', async (params) => {
  const { data } = await axios.post('/profile', params).catch(error => error.response);
  
  return data;
});

export const fetchProfile = createAsyncThunk('profile/fetchProfile', async () => {
  const { data } = await axios.get('/profile').catch(error => error.response);
  
  return data;
});

const profileSlice = createSlice({
  name: 'prodile',
  initialState,
  reducers: {
    resetProfile: (state) => {
      state.data = null;
      state.status = 'loaded';
    }
  },
  extraReducers: {
    [fetchEditProfile.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchEditProfile.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded'
    },
    [fetchEditProfile.rejected]: (state, action) => {
      state.data = null;
      state.status = action.message;
    },
    [fetchProfile.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchProfile.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded'
    },
    [fetchProfile.rejected]: (state, action) => {
      state.data = null;
      state.status = action.message;
    }
  }
});

export const selectImage = (state) => state.profile.data?.profile?.image;

export const selectName = (state) => state.profile.data?.profile?.name;

export const selectCity = (state) => state.profile.data?.profile?.city;

export const selectMessage = (state) => state.profile.data?.message;

export const profileReducer = profileSlice.reducer;

export const { resetProfile } = profileSlice.actions;