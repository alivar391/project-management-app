import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL, TOKEN } from '../constants/constants';

//use constant token in this case
export const getBoard = createAsyncThunk('board/get', async (params: { boardId: string }) => {
  try {
    const response = await fetch(`${BASE_URL}/boards/${params.boardId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error('Something go wrong');
  }
});
