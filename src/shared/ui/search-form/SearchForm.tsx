import { Component } from 'react';
import Input from '../input/Input';
import Button from '../button/Button';
import { UI_MESSAGES } from '../../constants/messages';
import styles from './search-form.module.scss';

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
      <form onSubmit={this.handleSubmit} className={styles.searchForm}>
        <div>
          <Input
            label="search"
            id="search"
            type="search"
            value={this.state.query}
            onChange={this.handleInputChange}
            className={styles.input}
            hideLabel
          />
          <Button type="submit" className={styles.button}>
            {UI_MESSAGES.BUTTON_SEARCH}
          </Button>
        </div>
      </form>
    );
  }
}

export default SearchForm;
