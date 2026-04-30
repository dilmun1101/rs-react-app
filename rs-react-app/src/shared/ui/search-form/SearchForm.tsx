import { Component } from 'react';
import Input from '../input/Input';
import Button from '../button/Button';

interface IFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSearch?: (query: string) => void;
}

interface IFormState {
  query: string;
}

class SearchForm extends Component<IFormProps, IFormState> {
  constructor(props: IFormProps) {
    super(props);
    this.state = { query: '' };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onSearch?.(this.state.query);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <Input
            label="search"
            id="search"
            type="search"
            value={this.state.query}
            onChange={this.handleInputChange}
          />
          <Button type="submit">Search</Button>
        </div>
      </form>
    );
  }
}

export default SearchForm;
