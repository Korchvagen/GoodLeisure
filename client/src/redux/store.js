import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth.js';
import { interestsReducer } from './slices/interests.js'
import { leisuresReducer } from './slices/leisures.js';
import { favoritesReducer } from './slices/favorites.js';
import { profileReducer } from './slices/profile.js';
import loadingReducer from './slices/loader.js';
import coordsReducer from './slices/coords.js';
import languagesReducer from './slices/language.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    interests: interestsReducer,
    leisures: leisuresReducer,
    favorites: favoritesReducer,
    profile: profileReducer,
    loading: loadingReducer,
    coords: coordsReducer,
    language: languagesReducer
  }
});

export default store;