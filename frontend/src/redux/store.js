import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import patientsReducer from './slices/patients';
import authReducer from './slices/auth';

const reducers = {
  patients: patientsReducer,
  auth: authReducer,
}

export const store = configureStore({ reducer: reducers,
  middleware: [...getDefaultMiddleware({immutableCheck: false, serializableCheck: false})] })
// The store now has redux-thunk added and the Redux DevTools Extension is turned on