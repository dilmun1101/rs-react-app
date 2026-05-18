import { Link, useSearchParams } from 'react-router';
import { UI_MESSAGES } from '../../constants/messages';
import styles from './paginataion.module.scss';
import cx from 'classnames';

interface Props {
  hasMore: boolean;
  className?: string;
}

function Pagination({ className, hasMore }: Props) {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page') ?? '1');

  const prevParams = new URLSearchParams(searchParams);
  prevParams.delete('details');
  prevParams.set('page', String(currentPage - 1));
  const nextParams = new URLSearchParams(searchParams);
  nextParams.delete('details');
  nextParams.set('page', String(currentPage + 1));

  const preventClick = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = !hasMore;

  return (
    <div className={cx(styles.pagination, className)}>
      <Link
        to={`?${prevParams.toString()}`}
        className={cx(styles.link, { [styles.disabledLink]: isPrevDisabled })}
        onClick={isPrevDisabled ? preventClick : undefined}
      >
        {UI_MESSAGES.BUTTON_PREV}
      </Link>

      <span>{currentPage}</span>

      <Link
        to={`?${nextParams.toString()}`}
        className={cx(styles.link, { [styles.disabledLink]: isNextDisabled })}
        onClick={isNextDisabled ? preventClick : undefined}
      >
        {UI_MESSAGES.BUTTON_NEXT}
      </Link>
    </div>
  );
}

export default Pagination;
