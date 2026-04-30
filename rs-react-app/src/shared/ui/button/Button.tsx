import { Component } from 'react';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
}

class Button extends Component<IButtonProps> {
  render() {
    const { children, ...rest } = this.props;

    return <button {...rest}>{children}</button>;
  }
}

export default Button;
