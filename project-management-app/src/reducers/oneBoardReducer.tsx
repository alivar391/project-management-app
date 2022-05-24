import { createSlice } from '@reduxjs/toolkit';
import { getBoard } from '../thunks/board';
import { addTask, deleteTask, updateTask } from '../thunks/task';

export type ITask = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
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
  isLoading: boolean;
};

const initialState: BoardState = {
  board: {
    id: '',
    title: '',
    columns: [],
  },
  isLoading: false,
};

const oneBoardReducer = createSlice({
  name: 'oneBoard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoard.fulfilled, (state, action) => {
        state.board = action.payload;
        state.isLoading = false;
      })
      .addCase(getBoard.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getBoard.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addTask.fulfilled, (state, action) => {})
      .addCase(addTask.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateTask.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {})
      .addCase(deleteTask.rejected, (_, action) => {});
  },
});

export default oneBoardReducer.reducer;
