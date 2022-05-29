import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IBoard } from '../../../reducers/boardsReducer';
import {
  changeModalFunction,
  changeModalName,
  changeModalText,
  changeModalTitle,
  toggleActive,
} from '../../../reducers/modalReducer';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Button } from '../../Button/Button';
import Input from '../../Input/Input';

export const UpdateModal = () => {
  const dispatch = useAppDispatch();
  const [vueInfo, setVueInfo] = useState(true);
  const { text, title, confirmFunction, changingInfo } = useAppSelector((state) => state.modal);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBoard>({
    mode: 'onChange',
  });
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<IBoard> = (data: IBoard) => {
    const info = {
      title: data.title,
      id: changingInfo.id,
      description: data.description,
    };
    confirmFunction(info);
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
    <div className="modal__cont container-form" onClick={(e) => e.stopPropagation()}>
      {vueInfo ? (
        <div className="modal__info" onClick={() => setVueInfo(false)}>
          <div>{changingInfo.title}</div>
          <div className="modal__description">{changingInfo.description}</div>
        </div>
      ) : (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="modal__title">{title}</h2>
          <Input
            register={register('title', {
              required: 'Requered',
              minLength: { value: 3, message: t('BigFormModal.Too short title') },
            })}
            nameInput={'title'}
            textLabel={t('BigFormModal.Title')}
            datatestId={'input-title'}
            type={'text'}
            errors={errors}
          />
          <Input
            register={register('description')}
            nameInput={'description'}
            textLabel={t('BigFormModal.Description')}
            datatestId={'input-description'}
            type={'text'}
            errors={errors}
          />
          <Button
            data-testid="button-submit-form"
            className="btn__modal"
            onClick={handleSubmit(onSubmit)}
          >
            {text}
          </Button>
        </form>
      )}
      <Button data-testid="button-close-form" className="btn__modal" onClick={() => closingModal()}>
        {t('BigFormModal.Back')}
      </Button>
    </div>
  );
};
