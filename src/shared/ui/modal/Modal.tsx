import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Button from '../button/Button';
import { X } from 'lucide-react';
import styles from './modal.module.scss';
import cx from 'classnames';

const modalRoot = document.getElementById('modal-root');

interface Props {
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ onClose, children }: Props) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.showModal();

    const handleCancel = (event: Event) => {
      event.preventDefault();
      onClose();
    };

    dialog.addEventListener('cancel', handleCancel);
    return () => {
      dialog.removeEventListener('cancel', handleCancel);
    };
  }, [onClose]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <dialog
      className={cx(styles.modal)}
      ref={dialogRef}
      onClick={handleOverlayClick}
    >
      <Button className={styles.closeButton} onClick={onClose} type="button">
        <X size={20} />
      </Button>
      {children}
    </dialog>,
    modalRoot
  );
}

export default Modal;
