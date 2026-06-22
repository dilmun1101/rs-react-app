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

  const handleDownload = async (): Promise<void> => {
    const response = await fetch('/api/export-csv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedCards),
    });

    if (!response.ok) {
      throw new Error('Failed to download CSV');
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${String(count)}_items.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={cx(styles.flyout, className)}>
      <p className={styles.count}>{t('selected', { count })}</p>

      <Button className={styles.button} onClick={handleUnselectAll}>
        {t('unselectAll')}
      </Button>

      <Button
        className={styles.button}
        onClick={() => {
          void handleDownload();
        }}
      >
        {t('download')}
      </Button>
    </div>
  );
}

export default SelectionPanel;
