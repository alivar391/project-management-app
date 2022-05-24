import { IBoard } from '../../reducers/boardsReducer';
import { useAppDispatch } from '../../store/hooks';
import { deleteBoard, updateBoard } from '../../thunks/boards';
import { IOpenModalFunction } from './MainPage';
import { Link } from 'react-router-dom';
import { IInfo } from '../../reducers/modalReducer';

interface IProps {
  board: IBoard;
  openModal: IOpenModalFunction;
}

export function Board({ board, openModal }: IProps) {
  const dispatch = useAppDispatch();

  function updateNewBoard({ title, id }: IInfo) {
    const board = {
      title: title || '',
      id,
    };
    dispatch(updateBoard(board));
  }

  function deleteNewBoard(info: IInfo) {
    dispatch(deleteBoard(info.id));
  }

  return (
    <div className="board">
      <Link to={`/${board.id}`} className="board__view">
        <p className="board__title">{board.title}</p>
      </Link>
      <div className="board__buttns">
        <span
          className="icon-button"
          onClick={() => openModal('FormModal', 'Change a board', updateNewBoard, 'Update', board)}
        >
          <img src="./../assets/jpg/pencil.png" alt="icon-file" />
        </span>
        <span
          className="icon-button"
          onClick={() =>
            openModal(
              'ConfirmModal',
              'Do you realy want to delete a board?',
              deleteNewBoard,
              'Ok',
              board
            )
          }
        >
          <img src="./../assets/jpg/trash.png" alt="icon-file" />
        </span>
      </div>
    </div>
  );
}
