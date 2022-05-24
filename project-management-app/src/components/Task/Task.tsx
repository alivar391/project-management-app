import {
  changeModalFunction,
  changeModalName,
  changeModalText,
  changeModalTitle,
  IInfo,
  setModalInfo,
  toggleActive,
} from '../../reducers/modalReducer';
import { ITask } from '../../reducers/oneBoardReducer';
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

  const onDeleteTask = async ({ id }: IInfo) => {
    await dispatch(deleteTask({ boardId, columnId, id, token }));
    dispatch(getBoard({ boardId }));
  };

  return (
    <li key={task.id} className="task_title" id={`task-${task.order}`}>
      <div
        className="delete-task"
        onClick={() =>
          openModal('ConfirmModal', 'Do you realy want to delete this task?', onDeleteTask, 'Ok', {
            id,
          })
        }
      ></div>
      {task.title}
    </li>
  );
};
