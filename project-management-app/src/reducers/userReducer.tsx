import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { authUser, registerUser } from '../thunks/user';

export type UserState = {
  token: {
    token: string | null;
  };
  userInfo: {
    id: string | null;
    login: string | null;
    password: string | null;
  };
  users: [];
};

const initialState: UserState = {
  token: {
    token: null,
  },
  userInfo: {
    id: null,
    login: null,
    password: null,
  },
  users: [],
};

const messagesForUser = {
  register: 'User registered successfully',
  auth: 'User authorisation successfully',
  /* deleteUser: 'User deleted successfully',
  updateUser: 'User update successfully', */
};

const userReducer = createSlice({
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
      })
      .addCase(authUser.fulfilled, (state, action) => {
        toast.success(messagesForUser.auth);
        state.token = action.payload;
      })
      .addCase(authUser.rejected, (state, action) => {
        toast.error(action.error.message);
      });
  },
});

export default userReducer.reducer;
export const { setUserInfo } = userReducer.actions;
