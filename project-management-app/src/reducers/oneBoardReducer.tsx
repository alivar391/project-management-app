import { createSlice } from '@reduxjs/toolkit';
import { getBoard } from '../thunks/board';
import { addTask, deleteTask } from '../thunks/task';

export type IFiles = {
  filename: string;
  fileSize: number;
};

export type ITask = {
  id: string;
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
  files: IFiles[];
};

export type IColumn = {
  id: string;
  title: string;
  order: number;
  tasks: ITask[];
};

export type BoardState = {
  board: {
    id: string;
    title: string;
    columns: IColumn[];
  };
};

const initialState: BoardState = {
  board: {
    id: '',
    title: '',
    columns: [],
  },
};

const oneBoardReducer = createSlice({
  name: 'oneBoard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoard.fulfilled, (state, action) => {
        state.board = action.payload;
      })
      .addCase(getBoard.rejected, (state, action) => {})
      .addCase(addTask.fulfilled, (state, action) => {})
      .addCase(addTask.rejected, (state, action) => {})
      .addCase(deleteTask.fulfilled, (state, action) => {})
      .addCase(deleteTask.rejected, (_, action) => {});
  },
});

export default oneBoardReducer.reducer;
