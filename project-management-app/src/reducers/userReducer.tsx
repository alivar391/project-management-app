import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { registerUser } from '../thunks/user';

export type StoreType = {
  token: string;
  userInfo: {
    id: string;
    login: string;
    password: string;
  };
};

const initialState = {
  token: '',
  userInfo: {
    id: '',
    login: '',
    password: '',
  },
};

const messagesForUser = {
  register: 'User registered successfully',
  auth: 'User authorisation successfully',
  /* deleteUser: 'User deleted successfully',
  updateUser: 'User update successfully', */
};

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo.login = action.payload.login;
      state.userInfo.password = action.payload.password;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        toast.success(messagesForUser.register);
        state.userInfo = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        toast.error(action.error.message);
      });
  },
});

export default userReducer.reducer;
export const { setUserInfo } = userReducer.actions;
