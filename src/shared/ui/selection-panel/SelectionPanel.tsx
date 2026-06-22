'use client';

import Button from '../button/Button';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks';
import { unselectAll } from '@/lib/selectedSlice/selectedSlice';
import {
  selectSelectedCards,
  selectSelectedCount,
} from '@/lib/selectedSlice/selectors/selectors';
import cx from 'classnames';
import styles from './selection-panel.module.scss';
import { convertToCSV } from '@/shared/utils/convert-to-csv/convert-to-csv';
import { downloadCsv } from '@/shared/utils/download-csv/download-csv';
import { useTranslations } from 'next-intl';

interface Props {
  className?: string;
}

function SelectionPanel({ className }: Props) {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectSelectedCount);
  const selectedCards = useAppSelector(selectSelectedCards);
  const t = useTranslations('SelectionPanel');

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
      <p className={styles.count}>{t('selected', { count })}</p>
      <Button className={styles.button} onClick={handleUnselectAll}>
        {t('unselectAll')}
      </Button>
      <Button className={styles.button} onClick={handleDownload}>
        {t('download')}
      </Button>
    </div>
  );
}

export default SelectionPanel;
