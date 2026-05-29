import Button from '../../shared/ui/button/Button';
import { useParams, useOutletContext } from 'react-router';
import CardSkeleton from '../../shared/ui/card-skeleton/CardSkeleton';
import styles from './card-details.module.scss';
import Card from '../../shared/ui/card/Card';
import { useGetCardByIdQuery } from '@/api/scryfall-api';
import { getRtkQueryErrorMessage } from '@/api/utils/rtk-query-error';

interface OutletContext {
  onClose: () => void;
}

function CardDetails() {
  const { cardId } = useParams<{ cardId: string }>();
  const { onClose } = useOutletContext<OutletContext>();

  const {
    data: card,
    isLoading,
    error,
  } = useGetCardByIdQuery(cardId ?? '', {
    skip: !cardId,
  });

  const errorMessage = getRtkQueryErrorMessage(error);

  return (
    <aside className={styles.detailsPanel}>
      <Button className={styles.button} onClick={onClose}>
        X
      </Button>
      {isLoading ? (
        <CardSkeleton />
      ) : errorMessage ? (
        <div className={styles.errorMessage}>Error: {errorMessage}</div>
      ) : card ? (
        <Card
          id={card.id}
          name={card.name}
          description={card.description}
          imageUrl={card.imageUrl}
          artist={card.artist}
          className={styles.detailsCard}
          imageClassName={styles.detailsImage}
        />
      ) : null}
    </aside>
  );
}

export default CardDetails;
