import { useRef } from 'react';
import { DragSourceMonitor, useDrag, useDrop } from 'react-dnd';
import { ITask } from '../../reducers/oneBoardReducer';
import { useAppDispatch } from '../../store/hooks';
import { getBoard } from '../../thunks/board';
import { deleteTask, updateTask } from '../../thunks/task';

import './task.css';

export type ITaskProps = {
  boardId: string;
  columnId: string;
  task: ITask;
};

export const Task = ({ boardId, columnId, task }: ITaskProps) => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token') as string;
  const { id } = task;
  const refTask = useRef<HTMLLIElement>(null);

  const [{ opacity }, dragRef] = useDrag({
    type: 'task',
    item: { task, columnId, boardId },
    collect: (monitor: DragSourceMonitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'task',
    async drop(item: ITaskProps) {
      if (item.task.id === task.id) {
        return;
      } else {
        const newTask = {
          title: item.task.title,
          order: task.order,
          description: item.task.description,
          userId: item.task.userId,
          boardId,
          columnId: columnId,
        };
        const { id } = item.task;
        const oldColumnId = item.columnId;
        await dispatch(updateTask({ boardId, oldColumnId, id, token, newTask }));
        await dispatch(getBoard({ boardId, token }));
      }
    },
  });

  dragRef(dropRef(refTask));

  const onDeleteTask = async () => {
    //confirm Modal
    await dispatch(deleteTask({ boardId, columnId, id, token }));
    dispatch(getBoard({ boardId, token }));
  };

  return (
    <li
      key={task.id}
      className="task_title"
      id={`task-${task.order}`}
      ref={refTask}
      style={{ opacity }}
    >
      <div className="delete-task" onClick={onDeleteTask}></div>
      {task.title}
    </li>
  );
};
