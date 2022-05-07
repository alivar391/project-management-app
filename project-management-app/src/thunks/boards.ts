import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../constants/constants';

export const getBoards = createAsyncThunk('boards/getBoards', async() => {
    const response = await fetch(`${BASE_URL}/boards`);
    if (response.status === 404) {
      throw new Error(`Board was not founded!`);
    }
    const data = await response.json();
    return data;
})

export const createBoard = createAsyncThunk('boards/createBoard', async (board) => {
  const response = await fetch(`${BASE_URL}/boards`, {
    method: 'POST',
    body: JSON.stringify(board),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 404) {
    throw new Error(`Board was not founded!`);
  }
  const data = await response.json();
  return data;
});

export const updateBoard = createAsyncThunk('boards/updateBoard', async (id, board) => {
  const response = await fetch(`${BASE_URL}/boards/${id}`, {
    method: 'PUT',
    body: JSON.stringify(board),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 404) {
    throw new Error(`Board was not founded!`);
  }
  const data = await response.json();
  return data;
});

export const deleteBoard = createAsyncThunk('boards/deleteBoard', async (id) => {
  const response = await fetch(`${BASE_URL}/boards/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 404) {
    throw new Error(`Board was not founded!`);
  }
  const data = await response.json();
  return data;
});
