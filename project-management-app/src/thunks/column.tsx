import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../constants/constants';

export type INewColumn = {
  title: string;
  order?: number;
};

export const addColumn = createAsyncThunk(
  'column/add',
  async (params: { boardId: string; token: string; newColumn: INewColumn }) => {
    try {
      const response = await fetch(`${BASE_URL}/boards/${params.boardId}/columns`, {
        method: 'POST',
        body: JSON.stringify(params.newColumn),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${params.token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch {
      throw new Error('Error, please try again later');
    }
  }
);
export const updateColumn = createAsyncThunk(
  'column/update',
  async (params: { boardId: string; id: string; token: string; newColumn: INewColumn }) => {
    try {
      const response = await fetch(`${BASE_URL}/boards/${params.boardId}/columns/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify(params.newColumn),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${params.token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch {
      throw new Error('Error, please try again later');
    }
  }
);

export const deleteColumn = createAsyncThunk(
  'column/delete',
  async (params: { boardId?: string; columnId: string; token: string }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/boards/${params.boardId}/columns/${params.columnId}`,
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
