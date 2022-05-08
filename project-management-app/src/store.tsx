import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import boardReduser from './reducers/boardsReducer';

const rootReducer = combineReducers({
  userInfo: userReducer,
  boards: boardReduser,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
export type RootState = ReturnType<typeof rootReducer>;

export default setupStore;
