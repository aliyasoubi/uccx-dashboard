import { configureStore } from '@reduxjs/toolkit';
import uccxReducer from './features/uccxSlice';

export const store = configureStore({
  reducer: {
    uccx: uccxReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 