import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../utils/axios.js';

const initialState = {
  data: null,
  status: 'loading',
};

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (params) => {
  const { data } = await axios.post('/auth/login', params).catch(error => error.response);
  
  return data;
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
  const { data } = await axios.post('/auth/register', params).catch(error => error.response);

  return data;
});

export const fetchRecoveryCode = createAsyncThunk('auth/fetchRecoveryCode', async (params) => {
  const { data } = await axios.post('/auth/recovery/email', params).catch(error => error.response);
  
  return data;
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  const { data } = await axios.get('/auth/me');

  return data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    }
  },
  extraReducers: {
    [fetchLogin.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded'
    },
    [fetchLogin.rejected]: (state, action) => {
      state.data = null;
      state.status = action.message;
    },
    [fetchRegister.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded'
    },
    [fetchRegister.rejected]: (state, action) => {
      state.data = null;
      state.status = action.payload.message;
    },
    [fetchRecoveryCode.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchRecoveryCode.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded'
    },
    [fetchRecoveryCode.rejected]: (state, action) => {
      state.data = null;
      state.status = action.payload.message;
    },
    [fetchAuthMe.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded'
    },
    [fetchAuthMe.rejected]: (state) => {
      state.data = null;
      state.status = 'error';
    }
  }
});

export const selectIsAuth = (state) => Boolean(state.auth.data?.email);

export const selectRegisterErrors = (state) => state.auth.data?.errors;

export const selectCode = (state) => state.auth.data?.code;

export const selectEmail = (state) => state.auth.data?.email;

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;