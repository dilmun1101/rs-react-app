import { useSearchParams } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import styles from './paginataion.module.scss';
import cx from 'classnames';
import { useTranslations } from 'next-intl';

interface Props {
  hasMore: boolean;
  className?: string;
}

function Pagination({ className, hasMore }: Props) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams?.get('page') ?? '1');
  const t = useTranslations('Pagination');

  const prevParams = new URLSearchParams(searchParams?.toString() ?? '');
  prevParams.delete('details');
  prevParams.set('page', String(currentPage - 1));
  const nextParams = new URLSearchParams(searchParams?.toString() ?? '');
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
        href={`?${prevParams.toString()}`}
        className={cx(styles.link, { [styles.disabledLink]: isPrevDisabled })}
        onClick={isPrevDisabled ? preventClick : undefined}
      >
        {t('prev')}
      </Link>

      <span>{currentPage}</span>

      <Link
        href={`?${nextParams.toString()}`}
        className={cx(styles.link, { [styles.disabledLink]: isNextDisabled })}
        onClick={isNextDisabled ? preventClick : undefined}
      >
        {t('next')}
      </Link>
    </div>
  );
}

export default Pagination;
