import { createAsyncThunk } from '@reduxjs/toolkit';
import { Column } from '../components/Column/Column';
import { BASE_URL } from '../constants/constants';
import { IColumn, ITask } from '../reducers/oneBoardReducer';

//get one Board
export const getBoard = createAsyncThunk(
  'board/get',
  async (params: { boardId: string; token: string }) => {
    try {
      const response = await fetch(`${BASE_URL}/boards/${params.boardId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${params.token}`,
        },
      });
      const data = await response.json();
      data.columns.sort((a: IColumn, b: IColumn) => (a.order > b.order ? 1 : -1));
      data.columns.forEach((column: IColumn) => {
        column.tasks.sort((a: ITask, b: ITask) => (a.order > b.order ? 1 : -1));
      });
      console.log(data);
      return data;
    } catch (err) {
      throw new Error('Something go wrong');
    }
  }
);
