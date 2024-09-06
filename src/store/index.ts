import { combineReducers, configureStore } from '@reduxjs/toolkit';
import textGeneration from './reducers/textGenerationSlice';

const rootReducer = combineReducers({ textGeneration });
export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export default store;
