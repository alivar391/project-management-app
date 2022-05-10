import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import boardReduser from './reducers/boardsReducer';
import modalReducer from './reducers/modalReducer';

const rootReducer = combineReducers({
  userInfo: userReducer,
  boards: boardReduser,
  modal: modalReducer,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};
export type RootState = ReturnType<typeof rootReducer>;

export default setupStore;
