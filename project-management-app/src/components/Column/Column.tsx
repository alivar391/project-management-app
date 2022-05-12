import { ITask } from '../../reducers/boardReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getBoard } from '../../thunks/board';
import { addTask } from '../../thunks/task';
import jwt_decode from 'jwt-decode';
import { Task } from '../Task/Task';
import './column.css';
import { IUserFromToken } from '../../pages/UpdateUserPage/UpdateUserPage';

type IColumnProps = {
  boardId: string;
  columnId: string;
  tasks: ITask[];
};

export const Column = ({ boardId, columnId, tasks }: IColumnProps) => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token') as string;
  const decodedToken: IUserFromToken = jwt_decode(token as string);
  const userId = decodedToken.userId;
  const boards = useAppSelector((state) => state.board.board);

  const getMaxOrderTask = (columnId: string) => {
    let max = 0;
    const needsCol = boards.columns.find((column) => column.id === columnId);
    if (needsCol && needsCol.tasks.length > 0) {
      const maxTask = needsCol.tasks.reduce((acc, curr) => (acc.order > curr.order ? acc : curr));
      max = maxTask.order;
    }
    return max;
  };
  const onAddTask = async (boardId: string, columnId: string) => {
    const maxOrder = getMaxOrderTask(columnId);
    if (token && boardId) {
      const newTask = {
        title: 'task1',
        order: maxOrder + 1,
        description: 'desc1',
        userId: userId,
      };
      await dispatch(addTask({ boardId, columnId, token, newTask }));
      dispatch(getBoard({ boardId, token }));
    }
  };

  if (tasks.length > 0) {
    return (
      <>
        <ul className="tasks">
          {tasks.map((task: ITask) => {
            return <Task key={task.id} boardId={boardId} columnId={columnId} task={task} />;
          })}
        </ul>
        <div onClick={() => onAddTask(boardId, columnId)}>Add Task</div>
      </>
    );
  } else {
    return <div onClick={() => onAddTask(boardId, columnId)}>Add First Task</div>;
  }
};
