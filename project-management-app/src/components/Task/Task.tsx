import { ITask } from '../../reducers/boardReducer';
import { useAppDispatch } from '../../store/hooks';
import { getBoard } from '../../thunks/board';
import { deleteTask } from '../../thunks/task';
import './task.css';

type ITaskProps = {
  boardId: string;
  columnId: string;
  task: ITask;
};

export const Task = ({ boardId, columnId, task }: ITaskProps) => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token') as string;
  const { id } = task;
  const onDeleteTask = async () => {
    //confirm Modal
    await dispatch(deleteTask({ boardId, columnId, id, token }));
    dispatch(getBoard({ boardId, token }));
  };
  return (
    <li key={task.id} className="task_title" id={`task-${task.order}`}>
      <div className="delete-task" onClick={onDeleteTask}></div>
      {task.title}
    </li>
  );
};
