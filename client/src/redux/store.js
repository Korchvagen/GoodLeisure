import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth.js';
import { interestsReducer } from './slices/interests.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    interests: interestsReducer
  }
});

export default store;