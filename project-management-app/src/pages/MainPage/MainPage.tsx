<<<<<<< HEAD
=======
import { useEffect } from 'react';
import { Button } from '../../components/Button/Button';
import { Header } from '../../components/Header/Header';
import { Spinner } from '../../components/Spinner/Spinner';
import { getTimeOfDay } from '../../helpers/helpers';
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
import { createBoard, getBoards } from '../../thunks/boards';
import { Board } from './Board';
import './main-page.css';

export type IOpenModalFunction = (
  modalName: string,
  modalTitle: string,
  confirmFunction: (title: string, id: string) => void,
  modalButtonTxt: string,
  info: IBoard | null
) => void;

>>>>>>> 2514510bbb2f11f5212cbffd1d65b53846cb2a64
export function MainPage() {
  const dispatch = useAppDispatch();
  const { boards, isLoading } = useAppSelector((store) => store.boards);
  const { name } = useAppSelector((store) => store.userInfo.userInfo);

  useEffect(() => {
    dispatch(getBoards());
  }, []);

  function makeBoards(boards: Array<IBoard>) {
    return boards.map((board: IBoard) => (
      <Board board={board} openModal={openModal} key={board.id} />
    ));
  }

  function openModal(
    modalName: string,
    modalTitle: string,
    confirmFunction: (title: string, id: string) => void,
    modalButtonTxt = 'Ok',
    info: IBoard | null = null
  ) {
    dispatch(changeModalName(modalName));
    dispatch(changeModalTitle(modalTitle));
    dispatch(changeModalText(modalButtonTxt));
    dispatch(changeModalFunction(confirmFunction));
    dispatch(toggleActive());
    if (info) dispatch(setModalInfo(info));
  }

  function createNewBoard(title: string) {
    const board = {
      title,
    };
    dispatch(createBoard(board));
  }

  return (
    <div>
<<<<<<< HEAD
      <p>Main Page</p>
=======
      <Header />
      <div className="main">
        <div className="main__header">
          <span className="main__title">
            {getTimeOfDay(new Date().getHours())}, {name || 'user'}!
          </span>
          <Button
            className="main__btn"
            onClick={() => openModal('FormModal', 'Create a board', createNewBoard, 'Create')}
          >
            Create board
          </Button>
        </div>
        <div className="main__cont">
          {isLoading ? (
            <Spinner />
          ) : makeBoards(boards).length ? (
            makeBoards(boards)
          ) : (
            <p>
              No boards yet,
              <span
                onClick={() => openModal('FormModal', 'Create a board', createNewBoard, 'Create')}
              >
                create a new one
              </span>
              ?
            </p>
          )}
        </div>
      </div>
>>>>>>> 2514510bbb2f11f5212cbffd1d65b53846cb2a64
    </div>
  );
}
