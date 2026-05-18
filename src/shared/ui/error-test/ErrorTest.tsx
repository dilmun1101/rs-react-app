import Button from '../button/Button';
import styles from './error-test.module.scss';
import { useState } from 'react';
import { UI_MESSAGES } from '../../constants/messages';
import cx from 'classnames';

interface Props {
  className?: string;
}

function ErrorTest({ className }: Props) {
  const [shouldThrowError, setShouldThrowError] = useState(false);

  const handleClick = () => {
    setShouldThrowError(true);
  };

  if (shouldThrowError) {
    throw new Error(UI_MESSAGES.TEST_ERROR);
  }

  return (
    <Button className={cx(styles.button, className)} onClick={handleClick}>
      {UI_MESSAGES.BUTTON_TEST_ERROR}
    </Button>
  );
}

export default ErrorTest;
