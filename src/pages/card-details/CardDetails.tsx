import Button from '../../shared/ui/button/Button';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import styles from './card-details.module.scss';
import Card from '../../shared/ui/card/Card';
import { useGetCardByIdQuery } from '@/api/scryfall-api';
import { getRtkQueryErrorMessage } from '@/api/utils/rtk-query-error';
import RefreshDetailsButton from '@/shared/ui/refresh-details-button/RefreshDetailsButton';
import ContentState from '@/shared/ui/content-state/ContentState';
import { X } from 'lucide-react';

const SKELETON_COUNT = 1;

function CardDetails() {
  const params = useParams<{ cardId: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const cardId = params?.cardId;

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

  const handleClose = () => {
    const newParams = new URLSearchParams(searchParams?.toString() ?? '');
    const query = newParams.toString();

    router.replace(query ? `/?${query}` : '/');
  };

  return (
    <aside className={styles.detailsPanel}>
      <div className={styles.actions}>
        {cardId && <RefreshDetailsButton cardId={cardId} onRefetch={refetch} />}
        <Button className={styles.button} onClick={handleClose}>
          <X size={20} strokeWidth={2} />
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
