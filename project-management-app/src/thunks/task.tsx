import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../constants/constants';
import { ITask } from '../reducers/oneBoardReducer';

export type INewTask = {
  title: string;
  order: number;
  description: string;
  userId: string;
};

export const addTask = createAsyncThunk(
  'tasks/add',
  async (params: { boardId: string; columnId: string; token: string; newTask: INewTask }) => {
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

export const changedOrderTask = createAsyncThunk(
  'tasks/put',
  async (params: {
    boardId: string;
    columnId: string;
    direction: string;
    task: ITask;
    token: string;
    userId: string;
  }) => {
    const updatedTask = {
      title: params.task.title,
      done: params.task.done,
      order: params.direction === 'minus' ? params.task.order - 1 : params.task.order + 1,
      description: params.task.description,
      userId: params.userId,
      boardId: params.boardId,
      columnId: params.columnId,
    };
    try {
      const response = await fetch(
        `${BASE_URL}/boards/${params.boardId}/columns/${params.columnId}/tasks/${params.task.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(updatedTask),
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

export const changedOrderOneTask = createAsyncThunk(
  'tasks/put',
  async (params: {
    boardId: string;
    columnId: string;
    order: number;
    task: ITask;
    token: string;
    userId: string;
  }) => {
    const updatedTask = {
      title: params.task.title,
      done: params.task.done,
      order: params.order,
      description: params.task.description,
      userId: params.userId,
      boardId: params.boardId,
      columnId: params.columnId,
    };
    try {
      const response = await fetch(
        `${BASE_URL}/boards/${params.boardId}/columns/${params.columnId}/tasks/${params.task.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(updatedTask),
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
