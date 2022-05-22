import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useParams } from 'react-router';
import { Button } from '../../components/Button/Button';
import { Column } from '../../components/Column/Column';
import { IColumn } from '../../reducers/oneBoardReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getBoard } from '../../thunks/board';
import { addColumn } from '../../thunks/column';
import './boardPage.css';

export function BoardPage() {
  const { boardId } = useParams();
  const token = localStorage.getItem('token') as string;
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => state.oneBoard.board);

  useEffect(() => {
    if (token && boardId) {
      dispatch(getBoard({ boardId, token }));
    }
  }, []);

  const onAddColumn = async () => {
    const newColumn = {
      title: 'Done1',
    };
    if (token && boardId) {
      await dispatch(addColumn({ boardId, token, newColumn }));
      await dispatch(getBoard({ boardId, token }));
    }
  };

  const Board = () => {
    if (boardId && board.columns.length > 0) {
      return (
        <DndProvider backend={HTML5Backend}>
          <ul className="columns">
            {board.columns.map((column: IColumn) => {
              return <Column key={column.id} boardId={boardId} column={column} />;
            })}
          </ul>
        </DndProvider>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="board-page__inner">
      <div className="content-board">
        <Board />
      </div>
      <Button onClick={onAddColumn} className={'btn-add-column'}>
        Add Column
      </Button>
    </div>
  );
}
