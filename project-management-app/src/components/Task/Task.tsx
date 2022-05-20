import { useRef } from 'react';
import { DragSourceMonitor, useDrag, useDrop } from 'react-dnd';
import { IUserFromToken } from '../../pages/UpdateUserPage/UpdateUserPage';
import { ITask } from '../../reducers/oneBoardReducer';
import { useAppDispatch } from '../../store/hooks';
import jwt_decode from 'jwt-decode';
import { getBoard } from '../../thunks/board';
import { changedOrderOneTask, changedOrderTask, deleteTask } from '../../thunks/task';
import './task.css';
import { getColumn } from '../../thunks/column';

type ITaskProps = {
  boardId: string;
  columnId: string;
  task: ITask;
};

export const Task = ({ boardId, columnId, task }: ITaskProps) => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token') as string;
  const { id } = task;
  const decodedToken: IUserFromToken = jwt_decode(token as string);
  const userId = decodedToken.userId;

  const ref = useRef<HTMLLIElement>(null);

  const [{ opacity }, dragRef] = useDrag({
    type: 'task',
    item: { task, columnId, boardId },
    collect: (monitor: DragSourceMonitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const movedTask = async (filteredTask: ITask[], columnId: string, direction: string) => {
    if (filteredTask) {
      filteredTask.map(async (task) => {
        return await Promise.all([
          dispatch(changedOrderTask({ boardId, columnId, direction, task, token, userId })),
        ]);
      });
    }
  };

  const movedOneTask = async (task: ITask, columnId: string, order: number) => {
    dispatch(changedOrderOneTask({ boardId, columnId, task, token, order, userId }));
  };

  const [, dropRef] = useDrop({
    accept: 'task',
    async drop(item: ITaskProps) {
      if (item.task.id === task.id) {
        return;
      } else {
        const allTasksFromColumn = await dispatch(getColumn({ boardId, columnId, token }));
        const tasks = allTasksFromColumn.payload.tasks;
        const filteredTask = tasks.filter((task: ITask) => task.order > item.task.order);
        const direction = task.order > item.task.order ? 'minus' : 'plus';
        await movedTask(filteredTask, columnId, direction);
        await movedOneTask(item.task, columnId, task.order);
        await dispatch(getBoard({ boardId, token }));
      }
    },
  });

  dragRef(dropRef(ref));

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
      ref={ref}
      style={{ opacity }}
    >
      <div className="delete-task" onClick={onDeleteTask}></div>
      {task.title}
    </li>
  );
};
