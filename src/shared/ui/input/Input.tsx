import { Component } from 'react';
import styles from './input.module.scss';
import cx from 'classnames';

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hideLabel?: boolean;
}

class Input extends Component<IInputProps> {
  render() {
    const { label, className, hideLabel = false, id, ...rest } = this.props;

    return (
      <div className={cx(styles.container, className)}>
        {label && (
          <label
            htmlFor={id}
            className={cx(
              styles.label,
              className,
              hideLabel && styles.hideLabel
            )}
          >
            {label}
          </label>
        )}
        <input className={cx(styles.input, className)} id={id} {...rest} />
      </div>
    );
  }
}

export default Input;
