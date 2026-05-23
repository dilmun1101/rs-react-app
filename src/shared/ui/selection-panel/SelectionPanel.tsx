import Button from '../button/Button';
import { useAppDispatch, useAppSelector } from '@store/hooks/hooks';
import { unselectAll } from '@store/slices/selectedSlice';
import {
  selectSelectedCount,
  selectSelectedCards,
} from '@store/selectors/selectors';
import cx from 'classnames';
import styles from './selection-panel.module.scss';
import { convertToCSV } from '@/shared/utils/convert-to-csv';
import { downloadCsv } from '@/shared/utils/download-csv';

interface Props {
  className?: string;
}

function SelectionPanel({ className }: Props) {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectSelectedCount);
  const selectedCards = useAppSelector(selectSelectedCards);

  if (count === 0) return null;

  const handleUnselectAll = () => {
    dispatch(unselectAll());
  };

  const handleDownload = () => {
    const csv = convertToCSV(selectedCards);
    downloadCsv(csv, `${String(count)}_items`);
  };

  return (
    <div className={cx(styles.flyout, className)}>
      <p className={styles.count}>Selected: {count} cards</p>
      <Button className={styles.button} onClick={handleUnselectAll}>
        Unselect all
      </Button>
      <Button className={styles.button} onClick={handleDownload}>
        Download
      </Button>
    </div>
  );
}

export default SelectionPanel;
