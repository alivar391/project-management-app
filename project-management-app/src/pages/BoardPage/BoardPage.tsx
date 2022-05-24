import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { Button } from '../../components/Button/Button';
import { Column } from '../../components/Column/Column';
import {
  changeModalFunction,
  changeModalName,
  changeModalText,
  changeModalTitle,
  IInfo,
  setModalInfo,
  toggleActive,
} from '../../reducers/modalReducer';
import { IColumn } from '../../reducers/oneBoardReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getBoard } from '../../thunks/board';
import { addColumn } from '../../thunks/column';
import './boardPage.css';

interface IBoardInfo {
  id: string | undefined;
}

export function BoardPage() {
  const { boardId } = useParams();
  const token = localStorage.getItem('token') as string;
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => state.oneBoard.board);
  const { t } = useTranslation();

  useEffect(() => {
    if (token && boardId) {
      dispatch(getBoard({ boardId }));
    }
  }, []);

  function openModal(
    modalName: string,
    modalTitle: string,
    confirmFunction: (info: IInfo) => void,
    modalButtonTxt = 'Ok',
    info: IBoardInfo | null = null
  ) {
    dispatch(changeModalName(modalName));
    dispatch(changeModalTitle(modalTitle));
    dispatch(changeModalText(modalButtonTxt));
    dispatch(changeModalFunction(confirmFunction));
    dispatch(toggleActive());
    if (info) dispatch(setModalInfo(info));
  }

  function countOrder() {
    let max = 0;
    if (board.columns.length > 0) {
      const maxOrder = board.columns.reduce((acc, curr) => (acc.order > curr.order ? acc : curr));
      max = maxOrder.order;
    }
    return max;
  }

  const onAddColumn = async ({ title, id }: IInfo) => {
    const max = countOrder();
    const boardId = id;
    const newColumn = {
      title: title || '',
      order: max + 1,
    };
    await dispatch(addColumn({ boardId, newColumn }));
    if (token && boardId) {
      await dispatch(getBoard({ boardId }));
    }
  };

  const Board = () => {
    if (boardId && board.columns.length > 0) {
      return (
        <>
          <ul className="columns">
            {board.columns.map((column: IColumn) => {
              return (
                <Column
                  key={column.id}
                  title={column.title}
                  boardId={boardId}
                  columnId={column.id}
                  tasks={column.tasks}
                  order={column.order}
                />
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
      <Button
        onClick={() =>
          openModal('FormModal', 'Create a new column', onAddColumn, 'Create', { id: boardId })
        }
        className={'btn-add-column'}
      >
        {t('boardPage.Add Column')}
      </Button>
    </>
  );
}
