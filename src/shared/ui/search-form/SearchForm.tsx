import { Component } from 'react';
import Input from '../input/Input';
import Button from '../button/Button';
import { UI_MESSAGES } from '../../constants/messages';
import styles from './search-form.module.scss';

interface IFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch?: (query: string) => void;
}

class SearchForm extends Component<IFormProps> {
  handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onSearch?.(this.props.query);
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onQueryChange(event.target.value);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={styles.searchForm}>
        <div>
          <Input
            label="search"
            id="search"
            type="search"
            value={this.props.query}
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
