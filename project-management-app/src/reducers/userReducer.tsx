import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { registerUser } from '../thunks/user';

const initialState = {};

const messagesForUser = {
  register: 'User registered successfully',
  /* deleteUser: 'User deleted successfully',
  updateUser: 'User update successfully', */
};

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, () => {
        toast.success(messagesForUser.register);
      })
      .addCase(registerUser.rejected, (state, action) => {
        toast.error(action.error.message);
      });
  },
});

export default userReducer.reducer;
