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

const trimSearchValue = (value: string) => value.trim();

class SearchForm extends Component<IFormProps> {
  handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onSearch?.(this.props.query);
    this.props.onSearch?.(trimSearchValue(this.props.query));
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onQueryChange(event.target.value);
  };

  render() {
    const {
      query,
      onQueryChange: _onQueryChange,
      onSearch: _onSearch,
      className,
      ...rest
    } = this.props;
    return (
      <form
        {...rest}
        onSubmit={this.handleSubmit}
        className={cx(styles.searchForm, className)}
      >
        <div className={cx(styles.wrapperInput)}>
          <Input
            label="search"
            id="search"
            type="search"
            value={query}
            onChange={this.handleInputChange}
            className={cx(styles.input)}
            hideLabel
          />
          <Button type="submit" className={cx(styles.button)}>
            {UI_MESSAGES.BUTTON_SEARCH}
          </Button>
        </div>
      </form>
    );
  }
}

export default SearchForm;
