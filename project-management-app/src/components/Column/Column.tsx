import { ITask } from '../../reducers/oneBoardReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getBoard } from '../../thunks/board';
import { addTask } from '../../thunks/task';
import jwt_decode from 'jwt-decode';
import { Task } from '../Task/Task';
import './column.css';
import { IUserFromToken } from '../../pages/UpdateUserPage/UpdateUserPage';
import { deleteColumn } from '../../thunks/column';

type IColumnProps = {
  boardId: string;
  columnId: string;
  title: string;
  tasks: ITask[];
  order: number;
};

export const Column = ({ boardId, columnId, tasks, title, order }: IColumnProps) => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token') as string;
  const decodedToken: IUserFromToken = jwt_decode(token as string);
  const userId = decodedToken.userId;
  const boards = useAppSelector((state) => state.oneBoard.board);

  const getMaxOrderTask = (columnId: string) => {
    let max = 0;
    const needsCol = boards.columns.find((column) => column.id === columnId);
    if (needsCol && needsCol.tasks.length > 0) {
      const maxTask = needsCol.tasks.reduce((acc, curr) => (acc.order > curr.order ? acc : curr));
      max = maxTask.order;
    }
    return max;
  };

  const onDeleteColumn = async (columnId: string) => {
    if (token && boardId) {
      await dispatch(deleteColumn({ boardId, columnId, token }));
      dispatch(getBoard({ boardId, token }));
    }
  };

  const onAddTask = async (boardId: string, columnId: string) => {
    const maxOrder = getMaxOrderTask(columnId);
    if (token && boardId) {
      const newTask = {
        title: 'task1',
        order: maxOrder + 1,
        description: 'desc1',
        userId: userId,
        done: false,
      };
      await dispatch(addTask({ boardId, columnId, token, newTask }));
      dispatch(getBoard({ boardId, token }));
    }
  };

  return (
    <>
      <li key={columnId} className="column" id={`column-${order}`}>
        <h3>{title}</h3>
        <div className="delete-column" onClick={() => onDeleteColumn(columnId)}></div>
        <ul className="tasks">
          {tasks.length > 0
            ? tasks.map((task: ITask) => {
                return <Task key={task.id} boardId={boardId} columnId={columnId} task={task} />;
              })
            : null}
        </ul>
        <div onClick={() => onAddTask(boardId, columnId)}>Add Task</div>
      </li>
    </>
  );
};
