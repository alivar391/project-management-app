import { useAppSelector } from '../../store/hooks';
import './modal.css';
import * as ModalsContent from './modalTypes';

export const Modal = () => {
  const { activeModal, name } = useAppSelector((state) => state.modal);

  const ModalContent = ModalsContent?.[name];
  return (
    <div className={activeModal ? 'modal' : 'modal-not_active'}>
      <div>
        <ModalContent />
      </div>
    </div>
  );
};
