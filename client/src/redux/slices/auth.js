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

export const fetchEditEmail = createAsyncThunk('auth/fetchEditEmail', async (params) => {
  const { data } = await axios.patch('/auth/edit/email', params).catch(error => error.response);
  
  return data;
});

export const fetchEditPassword = createAsyncThunk('auth/fetchEditPassword', async (params) => {
  const { data } = await axios.patch('/auth/edit/password', params).catch(error => error.response);
  
  return data;
});

export const fetchDeleteAccount = createAsyncThunk('auth/fetchDeleteAccount', async (params) => {
  const { data } = await axios.post('/auth/delete', params).catch(error => error.response);
  
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
    resetAuth: (state) => {
      state.data = null;
      state.status = 'loaded';
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
    [fetchEditEmail.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchEditEmail.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded'
    },
    [fetchEditEmail.rejected]: (state) => {
      state.data = null;
      state.status = 'error';
    },
    [fetchEditPassword.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchEditPassword.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded'
    },
    [fetchEditPassword.rejected]: (state) => {
      state.data = null;
      state.status = 'error';
    },
    [fetchDeleteAccount.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchDeleteAccount.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded'
    },
    [fetchDeleteAccount.rejected]: (state) => {
      state.data = null;
      state.status = 'error';
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

export const selectIsNewUser = (state) => Boolean(state.auth.data?.token);

export const selectErrors = (state) => state.auth.data?.errors;

export const selectMessage = (state) => state.auth.data?.message;

export const authReducer = authSlice.reducer;

export const { resetAuth } = authSlice.actions;