import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../constants/constants';
import { IUser } from '../pages/AutorisationPage/AutorisationPage';

export const registerUser = createAsyncThunk('user/register', async (user: IUser) => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 409) {
    throw new Error(`User login already exists!`);
  }
  const data = await response.json();
  return data;
});
