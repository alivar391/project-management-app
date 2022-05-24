import { IColumn, ITask } from '../../reducers/oneBoardReducer';
import { useAppDispatch } from '../../store/hooks';
import { getBoard } from '../../thunks/board';
import { addTask, updateTask } from '../../thunks/task';
import jwt_decode from 'jwt-decode';
import { ITaskProps, Task } from '../Task/Task';
import { IUserFromToken } from '../../pages/UpdateUserPage/UpdateUserPage';
import { deleteColumn, updateColumn } from '../../thunks/column';
import { useRef } from 'react';
import { DragSourceMonitor, useDrag, useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core';
import './column.css';

type IColumnProps = {
  boardId: string;
  column: IColumn;
  moveColumn: (dragIndex: number, hoverIndex: number) => void;
  index: number;
};

interface DragItem {
  index: number;
  column: IColumn;
}

export const Column = ({ boardId, column, moveColumn, index }: IColumnProps) => {
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

  const refColumn = useRef<HTMLLIElement>(null);

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: 'column',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!refColumn.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = refColumn.current?.getBoundingClientRect();
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }

      moveColumn(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [, dropRef] = useDrop({
    accept: ['column', 'task'],
    async drop(item: IColumnProps | ITaskProps) {
      console.log('drop');
      if ((item as IColumnProps).column) {
        if ((item as IColumnProps).column.id === column.id) {
          return;
        } else {
          const newColumn = {
            title: (item as IColumnProps).column.title,
            order: column.order,
          };
          const { id } = (item as IColumnProps).column;
          await dispatch(updateColumn({ boardId, id, token, newColumn }));
          await dispatch(getBoard({ boardId, token }));
        }
      } else if ((item as ITaskProps).task && column.tasks.length === 0) {
        const order = column.tasks.length > 0 ? (item as ITaskProps).task.order : 1;
        const newTask = {
          title: (item as ITaskProps).task.title,
          order,
          description: (item as ITaskProps).task.description,
          userId: (item as ITaskProps).task.userId,
          boardId,
          columnId: column.id,
        };
        const { id } = (item as ITaskProps).task;
        const oldColumnId = (item as ITaskProps).columnId;
        await dispatch(updateTask({ boardId, oldColumnId, id, token, newTask }));
        await dispatch(getBoard({ boardId, token }));
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'column',
    item: () => {
      return { id, index };
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(dropRef(refColumn));
  drag(drop(refColumn));

  // const [{ opacity }, dragRef] = useDrag({
  //   type: 'column',
  //   item: { column, boardId },
  //   collect: (monitor: DragSourceMonitor) => ({
  //     opacity: monitor.isDragging() ? 0.5 : 1,
  //   }),
  // });

  const onAddTask = async (boardId: string, columnId: string) => {
    if (token && boardId) {
      const newTask = {
        title: 'task2',
        description: 'desc1',
        userId: userId,
      };
      await dispatch(addTask({ boardId, columnId, token, newTask }));
      dispatch(getBoard({ boardId, token }));
    }
  };

  return (
    <>
      <li
        key={id}
        className="column"
        id={`column-${order}`}
        ref={refColumn}
        style={{ opacity }}
        data-handler-id={handlerId}
      >
        <h3>
          {title}
          {'__'}
          {order}
        </h3>
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
