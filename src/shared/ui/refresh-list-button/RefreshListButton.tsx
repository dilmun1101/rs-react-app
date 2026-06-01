import Button from '@/shared/ui/button/Button';
import { useAppDispatch } from '@/store/hooks/hooks';
import { scryfallApi } from '@/api/scryfall-api';

interface Props {
  onRefetch: () => unknown;
}

function RefreshListButton({ onRefetch }: Props) {
  const dispatch = useAppDispatch();

  const handleRefresh = () => {
    dispatch(scryfallApi.util.invalidateTags(['Cards']));
    onRefetch();
  };

  return <Button onClick={handleRefresh}>Refresh List</Button>;
}

export default RefreshListButton;
