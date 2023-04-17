import { configureStore } from '@reduxjs/toolkit';
import scaffoldingReducer from './scaffoldingSlice';

const store = configureStore({
  reducer: {
    scaffolding: scaffoldingReducer,
  },
});

export default store;
