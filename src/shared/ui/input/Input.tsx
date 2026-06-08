import styles from './input.module.scss';
import cx from 'classnames';
import type { Ref } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hideLabel?: boolean;
  error?: string;
  ref?: Ref<HTMLInputElement>;
}

function Input({
  label,
  className,
  hideLabel = false,
  id,
  error,
  ref,
  ...rest
}: Props) {
  const errorId = id ? `${id}-error` : undefined;

  return (
    <div className={cx(styles.container, className)}>
      <div className={cx(styles.containerInput)}>
        {label && (
          <label
            htmlFor={id}
            className={cx(styles.label, hideLabel && styles.hideLabel)}
          >
            {label}
          </label>
        )}
        <input id={id} ref={ref} className={styles.input} {...rest} />
      </div>

      <span
        id={errorId}
        className={cx(styles.error, !error && styles.errorStyle)}
      >
        {error ?? ' '}
      </span>
    </div>
  );
}

export default Input;
