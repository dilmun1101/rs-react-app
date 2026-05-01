import { Component } from 'react';
import styles from './button.module.scss';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
}

class Button extends Component<IButtonProps> {
  render() {
    const { children, ...rest } = this.props;

    return (
      <button {...rest} className={styles.button}>
        {children}
      </button>
    );
  }
}

export default Button;
