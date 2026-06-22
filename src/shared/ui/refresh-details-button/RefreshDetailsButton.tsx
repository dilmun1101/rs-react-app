'use client';

import Button from '@/shared/ui/button/Button';
import { useAppDispatch } from '@/lib/hooks/hooks';
import { scryfallApi } from '@/api/scryfall-api';
import { useTranslations } from 'next-intl';

interface Props {
  cardId: string;
  onRefetch: () => unknown;
}

function RefreshDetailsButton({ cardId, onRefetch }: Props) {
  const dispatch = useAppDispatch();
  const t = useTranslations('RefreshDetailsButton');

  const handleRefresh = () => {
    dispatch(scryfallApi.util.invalidateTags([{ type: 'Card', id: cardId }]));
    onRefetch();
  };

  return <Button onClick={handleRefresh}>{t('refresh')}</Button>;
}

export default RefreshDetailsButton;
