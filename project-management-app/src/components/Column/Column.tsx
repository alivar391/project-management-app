import { ITask } from '../../reducers/oneBoardReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getBoard } from '../../thunks/board';
import { addTask } from '../../thunks/task';
import jwt_decode from 'jwt-decode';
import { Task } from '../Task/Task';
import './column.css';
import { IUserFromToken } from '../../pages/UpdateUserPage/UpdateUserPage';
import { deleteColumn } from '../../thunks/column';
import {
  changeModalFunction,
  changeModalName,
  changeModalText,
  changeModalTitle,
  IInfo,
  setModalInfo,
  toggleActive,
} from '../../reducers/modalReducer';

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

  function openModal(
    modalName: string,
    modalTitle: string,
    confirmFunction: (info: IInfo) => void,
    modalButtonTxt = 'Ok',
    info: IInfo | null = null
  ) {
    dispatch(changeModalName(modalName));
    dispatch(changeModalTitle(modalTitle));
    dispatch(changeModalText(modalButtonTxt));
    dispatch(changeModalFunction(confirmFunction));
    dispatch(toggleActive());
    if (info) dispatch(setModalInfo(info));
  }

  const getMaxOrderTask = (columnId: string) => {
    let max = 0;
    const needsCol = boards.columns.find((column) => column.id === columnId);
    if (needsCol && needsCol.tasks.length > 0) {
      const maxTask = needsCol.tasks.reduce((acc, curr) => (acc.order > curr.order ? acc : curr));
      max = maxTask.order;
    }
    return max;
  };

  const onDeleteColumn = async ({ id }: IInfo) => {
    const columnId = id;
    if (token && boardId) {
      await dispatch(deleteColumn({ boardId, columnId, token }));
      dispatch(getBoard({ boardId }));
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
      };
      await dispatch(addTask({ boardId, columnId, token, newTask }));
      dispatch(getBoard({ boardId }));
    }
  };

  return (
    <>
      <li key={columnId} className="column" id={`column-${order}`}>
        <h3>{title}</h3>
        <div
          className="delete-column"
          onClick={() =>
            openModal(
              'ConfirmModal',
              'Do you realy want to delete a column?',
              onDeleteColumn,
              'Ok',
              { id: columnId }
            )
          }
        ></div>
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
