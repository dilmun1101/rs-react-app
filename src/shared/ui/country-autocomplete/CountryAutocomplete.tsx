import { useAppSelector } from '@/store/hooks/hooks';
import { selectCountries } from '@/store/countriesSlice/selectors/selectors';
import type { ComponentPropsWithRef } from 'react';
import styles from './country-autocomplete.module.scss';
import cx from 'classnames';

interface Props extends ComponentPropsWithRef<'input'> {
  label?: string;
  error?: string;
}

function CountryAutocomplete({ label, id, error, ref, ...rest }: Props) {
  const countries = useAppSelector(selectCountries);
  const listId = id ? `${id}-list` : 'country-list';
  const errorId = id ? `${id}-error` : undefined;

  return (
    <div className={styles.container}>
      {label && <label htmlFor={id}>{label}</label>}

      <input
        id={id}
        ref={ref}
        list={listId}
        autoComplete="off"
        className={cx(styles.input, error && styles.inputError)}
        {...rest}
      />

      <datalist id={listId}>
        {countries.map((country) => (
          <option key={country} value={country} />
        ))}
      </datalist>

      <span
        id={errorId}
        className={cx(styles.error, !error && styles.errorHidden)}
        role={error ? 'alert' : undefined}
      >
        {error ?? ' '}
      </span>
    </div>
  );
}

export default CountryAutocomplete;
