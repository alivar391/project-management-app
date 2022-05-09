import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../constants/constants';
import { IUser } from '../pages/SignUpPage/SignUpPage';

export interface ILogin {
  login: string;
  password: string;
}

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

export const authUser = createAsyncThunk('user/auth', async (login: ILogin) => {
  const response = await fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    body: JSON.stringify(login),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 403) {
    throw new Error('User was not founded or incorrect password!');
  }
  if (!response.ok) {
    throw new Error('Error, please try again later');
  }
  const data = await response.json();
  return data;
});

export const updateUser = createAsyncThunk(
  'user/update',
  async (params: { userId: string; newUser: IUser; token: string }) => {
    const response = await fetch(`${BASE_URL}/users/${params.userId}`, {
      method: 'PUT',
      body: JSON.stringify(params.newUser),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.token}`,
      },
    });
    if (response.status === 404) {
      throw new Error('User was not founded!');
    }
    if (!response.ok) {
      throw new Error('Error, please try again later');
    }
    const data = await response.json();
    return data;
  }
);

export const deleteUser = createAsyncThunk(
  'user/delete',
  async (params: { userId: string; token: string }) => {
    const response = await fetch(`${BASE_URL}/users/${params.userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${params.token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Error, please try again later');
    }
  }
);
