import Button from '../../shared/ui/button/Button';
import { useParams, useOutletContext } from 'react-router';
import styles from './card-details.module.scss';
import Card from '../../shared/ui/card/Card';
import { useGetCardByIdQuery } from '@/api/scryfall-api';
import { getRtkQueryErrorMessage } from '@/api/utils/rtk-query-error';
import RefreshDetailsButton from '@/shared/ui/refresh-details-button/RefreshDetailsButton';
import ContentState from '@/shared/ui/content-state/ContentState';

const SKELETON_COUNT = 1;

interface OutletContext {
  onClose: () => void;
}

function CardDetails() {
  const { cardId } = useParams<{ cardId: string }>();
  const { onClose } = useOutletContext<OutletContext>();

  const {
    data: card,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetCardByIdQuery(cardId ?? '', {
    skip: !cardId,
  });

  const errorMessage = getRtkQueryErrorMessage(error);

  return (
    <aside className={styles.detailsPanel}>
      <div className={styles.actions}>
        {cardId && <RefreshDetailsButton cardId={cardId} onRefetch={refetch} />}
        <Button className={styles.button} onClick={onClose}>
          X
        </Button>
      </div>

      <ContentState
        errorMessage={errorMessage}
        isLoadingState={isLoading || isFetching}
        skeletonCount={SKELETON_COUNT}
      >
        {card && (
          <Card
            id={card.id}
            name={card.name}
            description={card.description}
            imageUrl={card.imageUrl}
            artist={card.artist}
            className={styles.detailsCard}
            imageClassName={styles.detailsImage}
          />
        )}
      </ContentState>
    </aside>
  );
}

export default CardDetails;
