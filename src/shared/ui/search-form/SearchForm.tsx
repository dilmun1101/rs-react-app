'use client';

import Input from '../input/Input';
import Button from '../button/Button';
import styles from './search-form.module.scss';
import cx from 'classnames';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
  defaultValue: string;
  onSearch: (query: string) => void;
}

const trimSearchValue = (value: string) => value.trim();

function SearchForm({ onSearch, defaultValue, className, ...rest }: Props) {
  const [query, setQuery] = useState(defaultValue);
  const t = useTranslations('SearchForm');

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(trimSearchValue(query));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
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
          {t('buttonSearch')}
        </Button>
      </div>
    </form>
  );
}

export default SearchForm;
