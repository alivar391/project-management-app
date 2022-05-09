import { createSlice } from '@reduxjs/toolkit';

interface IModalState {
  activeModal: boolean;
  name: string;
  text: string;
  title: string;
  confirmFunction?: undefined | (() => JSX.Element);
  changingInfo: {
    id: string;
    title: string;
  };
}

const initialState: IModalState = {
  activeModal: false,
  name: '',
  text: '',
  title: '',
  confirmFunction: undefined,
  changingInfo: {
    id: '',
    title: '',
  },
};

const modalReduser = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleActive: (state) => {
      state.activeModal = !state.activeModal;
    },
    changeModalName: (state, action) => {
      state.name = action.payload;
    },
    changeModalText: (state, action) => {
      state.text = action.payload;
    },
    changeModalTitle: (state, action) => {
      state.title = action.payload;
    },
    changeModalFunction: (state, action) => {
      state.confirmFunction = action.payload;
    },
    setModalInfo: (state, action) => {
      state.changingInfo = { ...action.payload };
    },
  },
});

export const {
  toggleActive,
  changeModalName,
  changeModalText,
  changeModalTitle,
  changeModalFunction,
  setModalInfo,
} = modalReduser.actions;
export default modalReduser.reducer;
