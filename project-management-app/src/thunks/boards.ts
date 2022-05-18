import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../constants/constants';
import { IBoard, INewBoard } from '../reducers/boardsReducer';

// const TOKEN =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3N2FkY2RlOS1iZTA3LTRkMGUtYTU0OS02MTkyNjgyMDFlMDEiLCJsb2dpbiI6ImRpYW5hIiwiaWF0IjoxNjUyMDA3MzY2fQ.zho8oKpVE2dsknpK900VhOJ49qam_WwU_kE1DjE5Tkg';

const TOKEN = localStorage.getItem('token');

export const getBoards = createAsyncThunk('boards/getBoards', async () => {
  try {
    const response = await fetch(`${BASE_URL}/boards`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    if (response.status === 404) {
      throw new Error(`Board was not founded!`);
    }
    if (response.status === 401) {
      throw new Error(`Unauthorized!`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error('Something go wrong');
  }
});

export const createBoard = createAsyncThunk('boards/createBoard', async (board: INewBoard) => {
  try {
    const response = await fetch(`${BASE_URL}/boards`, {
      method: 'POST',
      body: JSON.stringify(board),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    if (response.status === 404) {
      throw new Error(`Board was not founded!`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error('Something go wrong');
  }
});

export const updateBoard = createAsyncThunk('boards/updateBoard', async (board: IBoard) => {
  try {
    const response = await fetch(`${BASE_URL}/boards/${board.id}`, {
      method: 'PUT',
      body: JSON.stringify({ title: board.title, description: board.description }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    if (response.status === 404) {
      throw new Error(`Board was not founded!`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error('Something go wrong');
  }
});

export const deleteBoard = createAsyncThunk('boards/deleteBoard', async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/boards/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    if (response.status === 404) {
      throw new Error(`Board was not founded!`);
    }
    if (response.status === 204) {
      const response = await fetch(`${BASE_URL}/boards`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.json();
      return data;
    }
  } catch (err) {
    throw new Error('Something go wrong');
  }
});
