/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Button } from '../../components/Button/Button';
import { Column } from '../../components/Column/Column';
import { IColumn } from '../../reducers/boardReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getBoard } from '../../thunks/board';
import { addColumn, deleteColumn } from '../../thunks/column';
import './boardPage.css';

export function BoardPage() {
  const { boardId } = useParams();
  const token = localStorage.getItem('token') as string;
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => state.board.board);

  useEffect(() => {
    if (token && boardId) {
      dispatch(getBoard({ boardId, token }));
    }
  }, []);
  let max = 0;

  const onAddColumn = async () => {
    if (board.columns.length > 0) {
      const maxOrder = board.columns.reduce((acc, curr) => (acc.order > curr.order ? acc : curr));
      max = maxOrder.order;
    }
    const newColumn = {
      title: 'Done1',
      order: max + 1,
    };
    await dispatch(addColumn({ boardId, token, newColumn }));
    if (token && boardId) {
      await dispatch(getBoard({ boardId, token }));
    }
  };

  const onDeleteColumn = async (columnId: string) => {
    if (token && boardId) {
      await dispatch(deleteColumn({ boardId, columnId, token }));
      dispatch(getBoard({ boardId, token }));
    }
  };

  const Board = () => {
    if (boardId && board.columns.length > 0) {
      return (
        <>
          <ul className="columns">
            {board.columns.map((column: IColumn) => {
              return (
                <li key={column.id} className="column">
                  <h3>{column.title}</h3>
                  <div className="delete-column" onClick={() => onDeleteColumn(column.id)}></div>
                  <Column boardId={boardId} columnId={column.id} tasks={column.tasks} />
                </li>
              );
            })}
          </ul>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <div className="content-board">
        <Board />
      </div>
      <Button onClick={onAddColumn} className={'btn-add-column'}>
        Add Column
      </Button>
    </>
  );
}
