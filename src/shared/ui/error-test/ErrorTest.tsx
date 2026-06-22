'use client';

import Button from '../button/Button';
import styles from './error-test.module.scss';
import { useState } from 'react';
import cx from 'classnames';
import { useTranslations } from 'next-intl';

interface Props {
  className?: string;
}

function ErrorTest({ className }: Props) {
  const [shouldThrowError, setShouldThrowError] = useState(false);
  const t = useTranslations('ErrorTest');

  const handleClick = () => {
    setShouldThrowError(true);
  };

  if (shouldThrowError) {
    throw new Error(t('testError'));
  }

  return (
    <Button className={cx(styles.button, className)} onClick={handleClick}>
      {t('buttonTestError')}
    </Button>
  );
}

export default ErrorTest;
