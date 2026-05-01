import { Component } from 'react';

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

class Input extends Component<IInputProps> {
  render() {
    const { label, id, ...rest } = this.props;

    return (
      <div>
        {label && <label htmlFor={id}>{label}</label>}
        <input id={id} {...rest} />
      </div>
    );
  }
}

export default Input;
