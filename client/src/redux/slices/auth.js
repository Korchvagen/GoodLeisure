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

export const fetchEmail = createAsyncThunk('auth/fetchEmail', async (params) => {
  const { data } = await axios.post('/auth/recovery/email', params).catch(error => error.response);
  
  return data;
});

export const fetchCode = createAsyncThunk('auth/fetchCode', async (params) => {
  const { data } = await axios.post('/auth/recovery/code', params).catch(error => error.response);
  
  return data;
});

export const fetchNewPassword = createAsyncThunk('auth/fetchNewPassword', async (params) => {
  const { data } = await axios.patch('/auth/recovery/password', params).catch(error => error.response);
  
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
    [fetchEmail.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchEmail.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded'
    },
    [fetchEmail.rejected]: (state, action) => {
      state.data = null;
      state.status = action.payload.message;
    },
    [fetchCode.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchCode.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded'
    },
    [fetchCode.rejected]: (state, action) => {
      state.data = null;
      state.status = action.payload.message;
    },
    [fetchNewPassword.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchNewPassword.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded'
    },
    [fetchNewPassword.rejected]: (state, action) => {
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

export const selectAuth = (state) => Boolean(state.auth.data?._id);

export const selectRegisterErrors = (state) => state.auth.data?.errors;

export const selectNewPAsswordErrors = (state) => state.auth.data?.errors;

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;