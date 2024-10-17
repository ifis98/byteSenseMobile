import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import userReducer from './userSlice';

// Configuration for redux-persist
const persistConfig = {
  key: 'root', // Root level
  storage: AsyncStorage, // Use AsyncStorage for persistence
};

// Combine reducers (if you have more than one)
const rootReducer = combineReducers({
  user: userReducer,
});

// Persist the reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});

// Create a persistor to manage persistence
export const persistor = persistStore(store);

export default store;
