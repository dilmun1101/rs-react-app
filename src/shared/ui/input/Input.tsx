import styles from './input.module.scss';
import cx from 'classnames';

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hideLabel?: boolean;
}

function Input({
  label,
  className,
  hideLabel = false,
  id,
  ...rest
}: IInputProps) {
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
    </div>
  );
}

export default Input;
