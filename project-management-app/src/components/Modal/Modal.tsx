import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './modal.css';
import Modals from './ModalTypes';

//type AllModals = typeof Modals;
type IAllModals = {
  [key: string]: () => JSX.Element;
};

const AllModals: IAllModals = Modals;

export const Modal = () => {
  const { activeModal, name } = useAppSelector((state) => state.modal);
  return (
    <div className={activeModal ? 'modal' : 'modal-not_active'}>
      <div className="modal__cont">{AllModals.ConfirmModal()}</div>
    </div>
  );
};
