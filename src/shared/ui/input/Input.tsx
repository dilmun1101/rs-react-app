import styles from './input.module.scss';
import cx from 'classnames';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hideLabel?: boolean;
  error?: string;
}

function Input({
  label,
  className,
  hideLabel = false,
  id,
  error,
  ...rest
}: Props) {
  const errorId = id ? `${id}-error` : undefined;

  return (
    <div className={cx(styles.container, className)}>
      {label && (
        <label
          htmlFor={id}
          className={cx(styles.label, hideLabel && styles.hideLabel)}
        >
          {label}
        </label>
      )}
      <input id={id} className={styles.input} {...rest} />

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
