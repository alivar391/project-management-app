import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../reducers/userReducer';
import boardReduser from '../reducers/boardsReducer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    userInfo: userReducer,
    boards: boardReduser,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
