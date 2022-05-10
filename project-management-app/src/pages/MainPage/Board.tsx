import { IBoard } from '../../reducers/boardsReducer';
import { useAppDispatch } from '../../store/hooks';
import { deleteBoard, updateBoard } from '../../thunks/boards';
import { IOpenModalFunction } from './MainPage';

interface IProps {
  board: IBoard;
  openModal: IOpenModalFunction;
}

export function Board({ board, openModal }: IProps) {
  const dispatch = useAppDispatch();

  function updateNewBoard(title: string, id: string) {
    const board = {
      title,
      id,
    };
    dispatch(updateBoard(board));
  }

  function deleteNewBoard(title = '', id: string) {
    dispatch(deleteBoard(id));
  }

  return (
    <div className="board">
      <div className="board__view">{board.title}</div>
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
