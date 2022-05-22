import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../constants/constants';

export type INewTask = {
  title: string;
  description: string;
  userId: string;
  order?: number;
  boardId?: string;
  columnId?: string;
};

export const addTask = createAsyncThunk(
  'tasks/add',
  async (params: { boardId?: string; columnId: string; token: string; newTask: INewTask }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/boards/${params.boardId}/columns/${params.columnId}/tasks`,
        {
          method: 'POST',
          body: JSON.stringify(params.newTask),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${params.token}`,
          },
        }
      );
      const data = await response.json();
      return data;
    } catch {
      throw new Error('Error, please try again later');
    }
  }
);
export const updateTask = createAsyncThunk(
  'tasks/update',
  async (params: {
    boardId: string;
    columnId: string;
    id: string;
    token: string;
    newTask: INewTask;
  }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/boards/${params.boardId}/columns/${params.columnId}/tasks/${params.id}`,
        {
          method: 'PUT',
          headers: {
            body: JSON.stringify(params.newTask),
            Authorization: `Bearer ${params.token}`,
          },
        }
      );
      const data = await response.json();
      return data;
    } catch {
      throw new Error('Error, please try again later');
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/delete',
  async (params: { boardId: string; columnId: string; id: string; token: string }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/boards/${params.boardId}/columns/${params.columnId}/tasks/${params.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${params.token}`,
          },
        }
      );
      const data = await response.json();
      return data;
    } catch {
      throw new Error('Error, please try again later');
    }
  }
);
/* 
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
 */
