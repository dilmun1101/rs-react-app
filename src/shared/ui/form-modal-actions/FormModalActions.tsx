import Button from '@/shared/ui/button/Button';
import { BUTTON_TYPES } from '@/shared/constants/enums';
import styles from './form-modal-actions.module.scss';

interface Props {
  onOpenUncontrolledForm: () => void;
  onOpenRHFForm: () => void;
}

function FormModalActions({ onOpenUncontrolledForm, onOpenRHFForm }: Props) {
  return (
    <div className={styles.actions}>
      <Button type={BUTTON_TYPES.BUTTON} onClick={onOpenUncontrolledForm}>
        Uncontrolled Form
      </Button>

      <Button type={BUTTON_TYPES.BUTTON} onClick={onOpenRHFForm}>
        React Hook Form
      </Button>
    </div>
  );
}

export default FormModalActions;
