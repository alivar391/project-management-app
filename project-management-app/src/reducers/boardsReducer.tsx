import { createSlice } from '@reduxjs/toolkit';
import { getBoards, createBoard, updateBoard, deleteBoard } from '../thunks/boards';

export interface IBoard {
  id: string;
  title: string;
}

export interface INewBoard {
  title: string;
}

export type StateType = {
  boards: Array<IBoard>;
};

const initialState = {
  boards: [],
};

const boardReduser = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: {
    [getBoards.fulfilled.type]: (state: StateType, action) => {
      console.log(action.payload);
      state.boards = [...action.payload];
    },
    [createBoard.fulfilled.type]: (state: StateType, action) => {
      state.boards.push(action.payload);
    },
    [updateBoard.fulfilled.type]: (state: StateType, action) => {
      const boardIndex = state.boards.findIndex((board) => board === action.payload);
      if (boardIndex !== -1) state.boards[boardIndex] = action.payload;
    },
    [deleteBoard.fulfilled.type]: (state: StateType, action) => {
      state.boards = [...state.boards.filter((board) => board.id !== action.payload)];
    },
  },
});

export default boardReduser.reducer;
