import Button from '../button/Button';
import { useAppDispatch, useAppSelector } from '@store/hooks/hooks';
import { unselectAll } from '@store/slices/selectedSlice';
import { selectSelectedCount } from '@store/selectors/selectors';
import cx from 'classnames';
import styles from './selection-panel.module.scss';

interface Props {
  className?: string;
}

function SelectionPanel({ className }: Props) {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectSelectedCount);

  if (count === 0) return null;

  const handleUnselectAll = () => {
    dispatch(unselectAll());
  };

  return (
    <div className={cx(styles.flyout, className)}>
      <p className={styles.count}>Selected: {count} cards</p>
      <Button className={styles.button} onClick={handleUnselectAll}>
        Unselect all
      </Button>
      <Button className={styles.button} disabled>
        Download
      </Button>
    </div>
  );
}

export default SelectionPanel;
