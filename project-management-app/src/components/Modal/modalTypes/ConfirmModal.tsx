import { toggleActive } from '../../../reducers/modalReducer';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

export const ConfirmModal = () => {
  const { title, text, changingInfo, confirmFunction } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const closingModal = () => {
    confirmFunction('', changingInfo.id);
    dispatch(toggleActive());
  };

  return (
    <p className="modal__cont">
      {title}
      <button className="btn__form-board form__btn-submit" onClick={() => closingModal()}>
        {text}
      </button>
      <button className="btn__form-board form__btn-submit" onClick={() => dispatch(toggleActive())}>
        Back
      </button>
    </p>
  );
};
