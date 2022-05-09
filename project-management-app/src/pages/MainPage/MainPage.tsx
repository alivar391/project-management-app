import { useEffect, useState } from 'react';
import { Header } from '../../components/Header/Header';
import { Modal } from '../../components/Modal/Modal';
import { BASE_URL } from '../../constants/constants';
import { IBoard } from '../../reducers/boardsReducer';
import {
  changeModalFunction,
  changeModalName,
  changeModalText,
  changeModalTitle,
  setModalInfo,
  toggleActive,
} from '../../reducers/modalReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createBoard, deleteBoard, getBoards, updateBoard } from '../../thunks/boards';
import './main-page.css';

export function MainPage() {
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector((store) => store.boards);
  // useEffect(() => {
  //   registerUser();
  // }, []);

  useEffect(() => {
    dispatch(getBoards());
  }, []);

  function makeBoards(boards: Array<IBoard>) {
    return boards.map((board: IBoard) => {
      return (
        <div className="board" key={board.id}>
          <div className="board__view">{board.title}</div>
          <div className="board__buttns">
            <span className="icon-button" onClick={() => openUpdateBoard(board)}>
              <img src="./../assets/jpg/pencil.png" alt="icon-file" />
            </span>
            <span className="icon-button" onClick={() => openConfirmModal(board)}>
              <img src="./../assets/jpg/trash.png" alt="icon-file" />
            </span>
          </div>
        </div>
      );
    });
  }

  function openCreateModal() {
    dispatch(toggleActive());
    dispatch(changeModalName('CreateBoardModal'));
    dispatch(changeModalText('Create'));
    dispatch(changeModalTitle('Create a board'));
  }

  function openUpdateBoard(board: IBoard) {
    dispatch(changeModalText('Update'));
    dispatch(changeModalName('UpdateBoardModal'));
    dispatch(changeModalTitle('Change a board'));
    dispatch(setModalInfo(board));
    dispatch(toggleActive());
  }

  function openConfirmModal(board: IBoard) {
    dispatch(changeModalText('Ok'));
    dispatch(changeModalName('ConfirmModal'));
    dispatch(changeModalTitle('Do you realy want to delete board?'));
    dispatch(setModalInfo(board));
    dispatch(toggleActive());
  }

  return (
    <div>
      <Header />
      <Modal />
      <div className="main">
        <div className="main__header">
          <span className="main__title">Good day, Diana!</span>
          <button className="main__btn" onClick={() => openCreateModal()}>
            Create board
          </button>
        </div>
        <div className="main__cont">{makeBoards(boards)}</div>
      </div>
    </div>
  );
}

// const registerUser = async () => {
//   const response = await fetch(`${BASE_URL}/signin`, {
//     method: 'POST',
//     body: JSON.stringify({
//       login: 'diana',
//       password: 'qwerty',
//     }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   const data = await response.json();
//   console.log(data);
//   return data;
// };
