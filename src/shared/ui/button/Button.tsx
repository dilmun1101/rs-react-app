import { Component } from 'react';
import styles from './button.module.scss';
import cx from 'classnames';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
}

class Button extends Component<IButtonProps> {
  render() {
    const { className, ...rest } = this.props;

    return (
      <button
        className={cx(styles.button, className)}
        {...rest}
        children={this.props.children}
      />
    );
  }
}

export default Button;
