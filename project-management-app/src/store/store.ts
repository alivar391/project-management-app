import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../reducers/userReducer';
import boardReduser from '../reducers/boardsReducer';
import modalReducer from '../reducers/modalReducer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    userInfo: userReducer,
    boards: boardReduser,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
