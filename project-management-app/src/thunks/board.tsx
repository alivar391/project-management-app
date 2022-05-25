import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../constants/constants';

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
      return data;
    } catch (err) {
      throw new Error('Something go wrong');
    }
  }
);
