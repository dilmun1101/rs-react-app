import Button from '../button/Button';
import { UI_MESSAGES } from '../../constants/messages';
import styles from './pagintaion.module.scss';
import cx from 'classnames';

interface Props {
  currentPage: number;
  hasMore: boolean;
  onPageChange: (page: number) => void;
  className?: string;
}

function Pagination({ className, currentPage, hasMore, onPageChange }: Props) {
  const handlePrevButton = () => {
    onPageChange(currentPage - 1);
  };
  const handleNextButton = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className={cx(styles.pagination, className)}>
      <Button disabled={currentPage === 1} onClick={handlePrevButton}>
        {UI_MESSAGES.BUTTON_PREV}
      </Button>

      <span>Page {currentPage}</span>

      <Button disabled={!hasMore} onClick={handleNextButton}>
        {UI_MESSAGES.BUTTON_NEXT}
      </Button>
    </div>
  );
}

export default Pagination;
