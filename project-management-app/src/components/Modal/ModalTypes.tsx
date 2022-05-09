import { useState } from 'react';
import {
  changeModalName,
  changeModalText,
  changeModalTitle,
  setModalInfo,
  toggleActive,
} from '../../reducers/modalReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createBoard, deleteBoard, updateBoard } from '../../thunks/boards';

export const CreateBoardModal = () => {
  const dispatch = useAppDispatch();
  const { text } = useAppSelector((state) => state.modal);
  const [inputValue, setinputValue] = useState('');

  function addNewBoard(inputValue: string) {
    const board = {
      title: inputValue,
    };
    dispatch(createBoard(board));
  }

  const closingModal = () => {
    addNewBoard(inputValue);
    dispatch(toggleActive());
    dispatch(changeModalName(''));
    dispatch(changeModalTitle(''));
    dispatch(changeModalText(''));
  };

  return (
    <p>
      <input type="text" value={inputValue} onChange={(e) => setinputValue(e.target.value)}></input>
      <button onClick={() => closingModal()}>{text}</button>
      <button onClick={() => dispatch(toggleActive())}>Back</button>
    </p>
  );
};

export const UpdateBoardModal = () => {
  const dispatch = useAppDispatch();
  const { text, changingInfo } = useAppSelector((state) => state.modal);
  const [inputValue, setinputValue] = useState(changingInfo.title);

  function changeBoard() {
    const board = {
      title: inputValue,
      id: changingInfo.id,
    };
    dispatch(updateBoard(board));
  }

  const closingModal = () => {
    changeBoard();
    dispatch(toggleActive());
    dispatch(changeModalName(''));
    dispatch(changeModalTitle(''));
    dispatch(changeModalText(''));
    dispatch(setModalInfo({ text: '', id: '' }));
  };

  return (
    <p>
      <input type="text" value={inputValue} onChange={(e) => setinputValue(e.target.value)}></input>
      <button onClick={() => closingModal()}>{text}</button>
      <button onClick={() => dispatch(toggleActive())}>Back</button>
    </p>
  );
};

export const ConfirmModal = () => {
  const { title, changingInfo } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const closingModal = () => {
    dispatch(deleteBoard(changingInfo.id));
    dispatch(toggleActive());
    dispatch(changeModalName(''));
    dispatch(changeModalTitle(''));
  };

  return (
    <p>
      {title}
      <button onClick={() => closingModal()}>Ok</button>
      <button onClick={() => dispatch(toggleActive())}>Back</button>
    </p>
  );
};

export default { CreateBoardModal, UpdateBoardModal, ConfirmModal };
