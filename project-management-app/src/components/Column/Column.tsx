/* eslint-disable @typescript-eslint/no-explicit-any */
import { IColumn, ITask } from '../../reducers/oneBoardReducer';
import { useAppDispatch } from '../../store/hooks';
import { getBoard } from '../../thunks/board';
import { addTask } from '../../thunks/task';
import jwt_decode from 'jwt-decode';
import { Task } from '../Task/Task';
import { IUserFromToken } from '../../pages/UpdateUserPage/UpdateUserPage';
import { deleteColumn, updateColumn } from '../../thunks/column';
import { useRef } from 'react';
import { DragSourceMonitor, useDrag, useDrop } from 'react-dnd';
import './column.css';

type IColumnProps = {
  boardId: string;
  column: IColumn;
};

export const Column = ({ boardId, column }: IColumnProps) => {
  const dispatch = useAppDispatch();
  const { id, title, order, tasks } = column;
  const token = localStorage.getItem('token') as string;
  const decodedToken: IUserFromToken = jwt_decode(token as string);
  const userId = decodedToken.userId;

  const onDeleteColumn = async (columnId: string) => {
    if (token && boardId) {
      await dispatch(deleteColumn({ boardId, columnId, token }));
      dispatch(getBoard({ boardId, token }));
    }
  };

  const ref = useRef<HTMLLIElement>(null);

  const [{ opacity }, dragRef] = useDrag({
    type: 'column',
    item: { column, boardId },
    collect: (monitor: DragSourceMonitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'column',
    async drop(item: IColumnProps) {
      if (item.column.id === column.id) {
        return;
      } else {
        const newColumn = {
          title: item.column.title,
          order: column.order,
        };
        const { id } = item.column;
        await dispatch(updateColumn({ boardId, id, token, newColumn }));
        await dispatch(getBoard({ boardId, token }));
      }
    },
  });

  dragRef(dropRef(ref));

  const onAddTask = async (boardId: string, columnId: string) => {
    if (token && boardId) {
      const newTask = {
        title: 'task1',
        description: 'desc1',
        userId: userId,
      };
      await dispatch(addTask({ boardId, columnId, token, newTask }));
      dispatch(getBoard({ boardId, token }));
    }
  };

  return (
    <>
      <li key={id} className="column" id={`column-${order}`} ref={ref} style={{ opacity }}>
        <h3>{title}</h3>
        <div className="delete-column" onClick={() => onDeleteColumn(id)}></div>
        <ul className="tasks">
          {tasks.length > 0
            ? tasks.map((task: ITask) => {
                return <Task key={task.id} boardId={boardId} columnId={id} task={task} />;
              })
            : null}
        </ul>
        <div onClick={() => onAddTask(boardId, id)}>Add Task</div>
      </li>
    </>
  );
};
