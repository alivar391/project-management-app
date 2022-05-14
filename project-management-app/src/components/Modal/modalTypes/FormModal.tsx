import { SubmitHandler, useForm } from 'react-hook-form';
import { IBoard } from '../../../reducers/boardsReducer';
import {
  changeModalFunction,
  changeModalName,
  changeModalText,
  changeModalTitle,
  toggleActive,
} from '../../../reducers/modalReducer';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import Input from '../../Input/Input';

export const FormModal = () => {
  const dispatch = useAppDispatch();
  const { text, title, confirmFunction, changingInfo } = useAppSelector((state) => state.modal);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBoard>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IBoard> = (data: IBoard) => {
    confirmFunction(data.title, changingInfo.id);
    closingModal();
  };

  const closingModal = () => {
    dispatch(toggleActive());
    dispatch(changeModalName('ConfirmModal'));
    dispatch(changeModalTitle(''));
    dispatch(changeModalText(''));
    dispatch(changeModalFunction(() => {}));
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
