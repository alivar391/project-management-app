import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { IUser } from '../pages/UpdateUserPage/UpdateUserPage';
import { authUser, registerUser, updateUser, deleteUser } from '../thunks/user';

export type UserState = {
  token: {
    token: string | null;
  };
  userInfo: {
    id: string | null;
    login: string | null;
    password: string | null;
    name?: string | null;
  };
  users: IUser[];
  succesRegister: boolean;
};

const initialState: UserState = {
  token: {
    token: null,
  },
  userInfo: {
    id: null,
    login: null,
    password: null,
    name: null,
  },
  users: [],
  succesRegister: false,
};

const messagesForUser = {
  register: 'User registered successfully',
  auth: 'User authorisation successfully',
  updateUser: 'User update successfully',
  deleteUser: 'User deleted successfully',
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo.login = action.payload.login;
      state.userInfo.password = action.payload.password;
      state.userInfo.id = action.payload.id;
    },
    setSuccesRegister(state, action) {
      state.succesRegister = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        toast.success(messagesForUser.register);
        state.userInfo = action.payload;
        state.succesRegister = true;
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
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        toast.success(messagesForUser.updateUser);
      })
      .addCase(updateUser.rejected, (state, action) => {
        toast.error(action.error.message);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        toast.success(messagesForUser.deleteUser);
        state.token.token = null;
        state.userInfo = { id: null, login: null, password: null, name: null };
      })
      .addCase(deleteUser.rejected, (state, action) => {
        toast.error(action.error.message);
      });
  },
});

export default userReducer.reducer;
export const { setUserInfo, setSuccesRegister, setToken } = userReducer.actions;
