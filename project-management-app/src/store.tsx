import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  userInfo: userReducer,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
export type RootState = ReturnType<typeof rootReducer>;

export default setupStore;
