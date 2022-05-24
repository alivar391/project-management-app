import { useEffect } from 'react';
import { Button } from '../../components/Button/Button';
import { Spinner } from '../../components/Spinner/Spinner';
import { getTimeOfDay } from '../../helpers/helpers';
import { IBoard } from '../../reducers/boardsReducer';
import {
  changeModalFunction,
  changeModalName,
  changeModalText,
  changeModalTitle,
  IInfo,
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
  confirmFunction: (info: IInfo) => void,
  modalButtonTxt: string,
  info: IBoard | null
) => void;

export function MainPage() {
  const dispatch = useAppDispatch();
  const { boards, isLoading } = useAppSelector((store) => store.boards);
  const userName = useAppSelector((state) => state.userInfo.userInfo.login);

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
    confirmFunction: (info: IInfo) => void,
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

  function createNewBoard({ title }: IInfo) {
    const board = {
      title: title || '',
    };
    dispatch(createBoard(board));
  }

  return (
    <div>
      <div className="main">
        <div className="main__header">
          <span className="main__title">
            {getTimeOfDay(new Date().getHours())},{' '}
            {`${userName![0].toUpperCase()}${userName?.slice(1)}` || 'user'}!
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
    </div>
  );
}
