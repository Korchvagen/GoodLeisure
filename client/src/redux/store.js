import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth.js';
import { interestsReducer } from './slices/interests.js'
import { leisuresReducer } from './slices/leisures.js';
import { favoritesReducer } from './slices/favorites.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    interests: interestsReducer,
    leisures: leisuresReducer,
    favorites: favoritesReducer
  }
});

export default store;