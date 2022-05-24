import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL, TOKEN } from '../constants/constants';

//get one Board
export const getBoard = createAsyncThunk('board/get', async (params: { boardId: string }) => {
  const response = await fetch(`${BASE_URL}/boards/${params.boardId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  const data = await response.json();
  return data;
});
