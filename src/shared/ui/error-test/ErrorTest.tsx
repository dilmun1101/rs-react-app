import Button from '../button/Button';
import styles from './error-test.module.scss';
import { useState } from 'react';
import { UI_MESSAGES } from '../../constants/messages';

function ErrorTest() {
  const [shouldThrowError, setShouldThrowError] = useState(false);

  const handleClick = () => {
    setShouldThrowError(true);
  };

  if (shouldThrowError) {
    throw new Error(UI_MESSAGES.TEST_ERROR);
  }

  return (
    <Button className={styles.button} onClick={handleClick}>
      {UI_MESSAGES.BUTTON_TEST_ERROR}
    </Button>
  );
}

export default ErrorTest;
