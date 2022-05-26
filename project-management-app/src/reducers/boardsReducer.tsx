import { createSlice } from '@reduxjs/toolkit';
import { getBoards, createBoard, updateBoard, deleteBoard } from '../thunks/boards';

export interface IBoard {
  id: string | undefined;
  title: string;
  description: string;
}

export interface INewBoard {
  title: string;
  description: string;
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
    [getBoards.rejected.type]: (state: StateType) => {
      state.isLoading = false;
    },
    [createBoard.fulfilled.type]: (state: StateType, action) => {
      state.boards.push(action.payload);
      state.isLoading = false;
    },
    [createBoard.pending.type]: (state: StateType) => {
      state.isLoading = true;
    },
    [createBoard.rejected.type]: (state: StateType) => {
      state.isLoading = false;
    },
    [updateBoard.fulfilled.type]: (state: StateType, action) => {
      state.isLoading = false;
      const boardIndex = state.boards.findIndex((board) => board.id === action.payload.id);
      if (boardIndex !== -1) state.boards[boardIndex] = action.payload;
    },
    [updateBoard.pending.type]: (state: StateType) => {
      state.isLoading = true;
    },
    [updateBoard.rejected.type]: (state: StateType) => {
      state.isLoading = false;
    },
    [deleteBoard.fulfilled.type]: (state: StateType, action) => {
      state.boards = [...action.payload];
      state.isLoading = false;
    },
    [deleteBoard.pending.type]: (state: StateType) => {
      state.isLoading = true;
    },
    [deleteBoard.rejected.type]: (state: StateType) => {
      state.isLoading = false;
    },
  },
});

export default boardReduser.reducer;
