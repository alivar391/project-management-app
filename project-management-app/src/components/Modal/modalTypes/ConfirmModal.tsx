import { toggleActive } from '../../../reducers/modalReducer';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Button } from '../../Button/Button';

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
      <Button className="btn__modal" onClick={() => closingModal()}>
        {text}
      </Button>
      <Button className="btn__modal" onClick={() => dispatch(toggleActive())}>
        Back
      </Button>
    </p>
  );
};
