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
  isLoading: boolean;
};

const initialState = {
  boards: [],
  isLoading: false,
};

const boardReduser = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: {
    [getBoards.fulfilled.type]: (state: StateType, action) => {
      state.boards = [...action.payload];
      state.isLoading = false;
    },
    [getBoards.pending.type]: (state: StateType) => {
      state.isLoading = true;
    },
    [createBoard.fulfilled.type]: (state: StateType, action) => {
      state.boards.push(action.payload);
      state.isLoading = false;
    },
    [createBoard.pending.type]: (state: StateType) => {
      state.isLoading = true;
    },
    [updateBoard.fulfilled.type]: (state: StateType, action) => {
      state.isLoading = false;
      const boardIndex = state.boards.findIndex((board) => board.id === action.payload.id);
      if (boardIndex !== -1) state.boards[boardIndex] = action.payload;
    },
    [updateBoard.pending.type]: (state: StateType) => {
      state.isLoading = true;
    },
    [deleteBoard.fulfilled.type]: (state: StateType, action) => {
      state.boards = [...action.payload];
      state.isLoading = false;
    },
    [deleteBoard.pending.type]: (state: StateType) => {
      state.isLoading = true;
    },
  },
});

export default boardReduser.reducer;
