import { Component } from 'react';
import styles from './input.module.scss';

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hideLabel?: boolean;
}

class Input extends Component<IInputProps> {
  render() {
    const { label, hideLabel = false, id, ...rest } = this.props;

    return (
      <div>
        {label && (
          <label
            htmlFor={id}
            className={hideLabel ? styles.hideLabel : undefined}
          >
            {label}
          </label>
        )}
        <input id={id} {...rest} />
      </div>
    );
  }
}

export default Input;
