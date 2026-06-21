import Button from '@/shared/ui/button/Button';
import { useAppDispatch } from '@/lib/hooks/hooks';
import { scryfallApi } from '@/api/scryfall-api';

interface Props {
  cardId: string;
  onRefetch: () => unknown;
}

function RefreshDetailsButton({ cardId, onRefetch }: Props) {
  const dispatch = useAppDispatch();

  const handleRefresh = () => {
    dispatch(scryfallApi.util.invalidateTags([{ type: 'Card', id: cardId }]));
    onRefetch();
  };

  return <Button onClick={handleRefresh}>Refresh details</Button>;
}

export default RefreshDetailsButton;
