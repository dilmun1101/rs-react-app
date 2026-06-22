'use client';

import Button from '@/shared/ui/button/Button';
import { useAppDispatch } from '@/lib/hooks/hooks';
import { scryfallApi } from '@/api/scryfall-api';
import { useTranslations } from 'next-intl';

interface Props {
  onRefetch: () => unknown;
}

function RefreshListButton({ onRefetch }: Props) {
  const dispatch = useAppDispatch();
  const t = useTranslations('RefreshListButton');

  const handleRefresh = () => {
    dispatch(scryfallApi.util.invalidateTags(['Cards']));
    onRefetch();
  };

  return <Button onClick={handleRefresh}>{t('refresh')}</Button>;
}

export default RefreshListButton;
