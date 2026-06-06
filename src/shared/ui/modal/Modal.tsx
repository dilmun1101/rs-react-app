import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Button from '../button/Button';
import { X } from 'lucide-react';
import styles from './modal.module.scss';
import cx from 'classnames';

const modalRoot = document.getElementById('modal-root');

interface Props {
  isActive: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ isActive, onClose, children }: Props) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) return;
    previouslyFocusedElement.current = document.activeElement as HTMLElement;
    dialogRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocusedElement.current?.focus();
    };
  }, [isActive, onClose]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isActive || !modalRoot) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div
        className={cx(styles.modal)}
        role="dialog"
        aria-modal="true"
        ref={dialogRef}
        tabIndex={-1}
      >
        <Button className={styles.closeButton} onClick={onClose} type="button">
          <X size={20} />
        </Button>
        {children}
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;
