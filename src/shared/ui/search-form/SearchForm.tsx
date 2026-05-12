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

function SearchForm({
  query,
  onQueryChange: _onQueryChange,
  onSearch: _onSearch,
  className,
  ...rest
}: IFormProps) {
  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    _onSearch?.(trimSearchValue(query));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    _onQueryChange(event.target.value);
  };

  return (
    <form
      {...rest}
      onSubmit={handleSubmit}
      className={cx(styles.searchForm, className)}
    >
      <div className={styles.wrapperInput}>
        <Input
          label="search"
          id="search"
          type="search"
          value={query}
          onChange={handleInputChange}
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

export default SearchForm;
