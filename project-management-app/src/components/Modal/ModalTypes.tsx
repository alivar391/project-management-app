import { SubmitHandler, useForm } from 'react-hook-form';
import {
  changeModalName,
  changeModalText,
  changeModalTitle,
  setModalInfo,
  toggleActive,
} from '../../reducers/modalReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createBoard, deleteBoard, updateBoard } from '../../thunks/boards';
import Input from '../Input/Input';

export type IBoard = {
  title: string;
};

export const CreateBoardModal = () => {
  const dispatch = useAppDispatch();
  const { text, title } = useAppSelector((state) => state.modal);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBoard>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IBoard> = (data: IBoard) => {
    const board = {
      title: data.title,
    };
    dispatch(createBoard(board));
    closingModal();
  };

  const closingModal = () => {
    dispatch(toggleActive());
    dispatch(changeModalName('ConfirmModal'));
    dispatch(changeModalTitle(''));
    dispatch(changeModalText(''));
  };

  return (
    <div className="modal__cont container-form">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h2>{title}</h2>
        <Input
          register={register('title', {
            required: 'Requered',
            minLength: { value: 3, message: 'Too short title' },
          })}
          nameInput={'title'}
          textLabel={'Title:'}
          datatestId={'input-title'}
          type={'text'}
          errors={errors}
        />
        <button
          data-testid="button-submit-form"
          className="btn__form-board form__btn-submit"
          onSubmit={handleSubmit(onSubmit)}
        >
          {text}
        </button>
      </form>
      <button
        data-testid="button-close-form"
        className="btn__form-board form__btn-submit"
        onClick={() => closingModal()}
      >
        Back
      </button>
    </div>
  );
};

export const UpdateBoardModal = () => {
  const dispatch = useAppDispatch();
  const { text, title, changingInfo } = useAppSelector((state) => state.modal);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBoard>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IBoard> = (data: IBoard) => {
    const board = {
      title: data.title,
      id: changingInfo.id,
    };
    dispatch(updateBoard(board));
    closingModal();
  };

  const closingModal = () => {
    dispatch(toggleActive());
    dispatch(changeModalName('ConfirmModal'));
    dispatch(changeModalTitle(''));
    dispatch(changeModalText(''));
    dispatch(setModalInfo({ text: '', id: '' }));
  };

  return (
    <div className="modal__cont container-form">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h2>{title}</h2>
        <Input
          register={register('title', {
            required: 'Requered',
            minLength: { value: 3, message: 'Too short title' },
          })}
          nameInput={'title'}
          textLabel={'Title:'}
          datatestId={'input-title'}
          type={'text'}
          errors={errors}
        />
        <button
          data-testid="button-submit-form"
          className="btn__form-board form__btn-submit"
          onSubmit={handleSubmit(onSubmit)}
        >
          {text}
        </button>
      </form>
      <button
        data-testid="button-close-form"
        className="btn__form-board form__btn-submit"
        onClick={() => closingModal()}
      >
        Back
      </button>
    </div>
  );
};

export const ConfirmModal = () => {
  const { title, changingInfo } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const closingModal = () => {
    dispatch(deleteBoard(changingInfo.id));
    dispatch(toggleActive());
    dispatch(changeModalTitle(''));
  };

  return (
    <p className="modal__cont">
      {title}
      <button onClick={() => closingModal()}>Ok</button>
      <button onClick={() => dispatch(toggleActive())}>Back</button>
    </p>
  );
};

export default { CreateBoardModal, UpdateBoardModal, ConfirmModal };
