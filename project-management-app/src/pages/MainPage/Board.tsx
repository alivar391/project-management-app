import { IBoard } from '../../reducers/boardsReducer';
import { useAppDispatch } from '../../store/hooks';
import { deleteBoard, updateBoard } from '../../thunks/boards';
import { IOpenModalFunction } from './MainPage';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface IProps {
  board: IBoard;
  openModal: IOpenModalFunction;
}

export function Board({ board, openModal }: IProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  function updateNewBoard(title: string, description: string, id: string) {
    const board = {
      title,
      description,
      id,
    };
    dispatch(updateBoard(board));
  }

  function deleteNewBoard(title = '', id: string) {
    dispatch(deleteBoard(id));
  }

  return (
    <div className="board">
      <Link to={`/${board.id}`} className="board__view">
        <p className="board__title">{board.title}</p>
      </Link>
      <div className="board__buttns">
        <span
          className="icon-button"
          onClick={() =>
            openModal(
              'FormModal',
              t('board.Change a board'),
              updateNewBoard,
              t('board.Update'),
              board
            )
          }
        >
          <img src="./../assets/jpg/pencil.png" alt="icon-file" />
        </span>
        <span
          className="icon-button"
          onClick={() =>
            openModal(
              'ConfirmModal',
              t('board.Do you realy want to delete a board?'),
              deleteNewBoard,
              t('board.Ok'),
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
