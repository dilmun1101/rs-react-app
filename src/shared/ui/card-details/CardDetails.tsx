import Button from '../button/Button';
import { useParams, useOutletContext } from 'react-router';
import { useState, useEffect } from 'react';
import { scryfallService } from '../../../api/service/scryfall-service';
import CardSkeleton from '../card-skeleton/CardSkeleton';
import styles from './card-details.module.scss';
import type { CardItem } from '../../constants/types';

interface OutletContext {
  onClose: () => void;
}

function CardDetails() {
  const { cardId } = useParams<{ cardId: string }>();
  const { onClose } = useOutletContext<OutletContext>();
  const [card, setCard] = useState<CardItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!cardId) return;

    const fetchCard = async () => {
      setIsLoading(true);
      try {
        const data = await scryfallService.getCardById(cardId);
        setCard(data);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchCard();
  }, [cardId]);

  return (
    <aside className={styles.detailsPanel}>
      <Button className={styles.button} onClick={onClose}>
        X
      </Button>
      {isLoading ? (
        <CardSkeleton />
      ) : card ? (
        <div className={styles.card}>
          <p>{card.name}</p>
          <div
            data-testid="card-image"
            className={styles.image}
            style={{ backgroundImage: `url(${card.imageUrl ?? ''})` }}
          />
          <p>{card.description}</p>
        </div>
      ) : null}
    </aside>
  );
}

export default CardDetails;
