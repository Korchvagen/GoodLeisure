import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth.js';
import { interestsReducer } from './slices/interests.js'
import { leisuresReducer } from './slices/leisures.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    interests: interestsReducer,
    leisures: leisuresReducer
  }
});

export default store;