import { Component } from 'react';
import styles from './button.module.scss';
import classNames from 'classnames';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
}

class Button extends Component<IButtonProps> {
  render() {
    const { children, className, ...rest } = this.props;

    return (
      <button className={classNames(styles.button, className)} {...rest}>
        {children}
      </button>
    );
  }
}

export default Button;
