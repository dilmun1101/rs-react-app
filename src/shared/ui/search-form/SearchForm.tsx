import { Component } from 'react';
import Input from '../input/Input';
import Button from '../button/Button';
import { UI_MESSAGES } from '../../constants/messages';
import styles from './search-form.module.scss';
import cx from 'classnames';

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
    const { query, className, ...rest } = this.props;
    return (
      <form
        {...rest}
        onSubmit={this.handleSubmit}
        className={cx(styles.searchForm, className)}
      >
        <div className={cx(styles.wrapperInput, className)}>
          <Input
            label="search"
            id="search"
            type="search"
            value={query}
            onChange={this.handleInputChange}
            className={cx(styles.input, className)}
            hideLabel
          />
          <Button type="submit" className={cx(styles.button, className)}>
            {UI_MESSAGES.BUTTON_SEARCH}
          </Button>
        </div>
      </form>
    );
  }
}

export default SearchForm;
