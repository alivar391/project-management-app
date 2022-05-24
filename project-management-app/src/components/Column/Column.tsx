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

  const [{ handlerId }, drop] = useDrop<IColumn, void, { handlerId: Identifier | null }>({
    accept: 'column',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: IColumn, monitor) {
      if (!refColumn.current) {
        return;
      }
      const dragIndex = item.order;
      const hoverIndex = order;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = refColumn.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }

      // Time to actually perform the action
      moveColumn(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.order = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'column',
    item: () => {
      return { id, order };
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(refColumn));

  // const [{ opacity }, dragRef] = useDrag({
  //   type: 'column',
  //   item: { column, boardId },
  //   collect: (monitor: DragSourceMonitor) => ({
  //     opacity: monitor.isDragging() ? 0.5 : 1,
  //   }),
  // });

  // dragRef(drop(refColumn));

  // const [, dropRef] = useDrop({
  //   accept: ['column', 'task'],
  //   async drop(item: IColumnProps | ITaskProps) {
  //     if ((item as IColumnProps).column) {
  //       if ((item as IColumnProps).column.id === column.id) {
  //         return;
  //       } else {
  //         const newColumn = {
  //           title: (item as IColumnProps).column.title,
  //           order: column.order,
  //         };
  //         const { id } = (item as IColumnProps).column;
  //         await dispatch(updateColumn({ boardId, id, token, newColumn }));
  //         await dispatch(getBoard({ boardId, token }));
  //       }
  //     } else if ((item as ITaskProps).task && column.tasks.length === 0) {
  //       const order = column.tasks.length > 0 ? (item as ITaskProps).task.order : 1;
  //       const newTask = {
  //         title: (item as ITaskProps).task.title,
  //         order,
  //         description: (item as ITaskProps).task.description,
  //         userId: (item as ITaskProps).task.userId,
  //         boardId,
  //         columnId: column.id,
  //       };
  //       const { id } = (item as ITaskProps).task;
  //       const oldColumnId = (item as ITaskProps).columnId;
  //       await dispatch(updateTask({ boardId, oldColumnId, id, token, newTask }));
  //       await dispatch(getBoard({ boardId, token }));
  //     }
  //   },
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
      <li key={id} className="column" id={`column-${order}`} ref={refColumn} style={{ opacity }}>
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
