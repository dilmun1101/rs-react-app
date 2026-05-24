import type { ChangeEvent, MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { selectItem, unselectItem } from '@/store/selectedSlice/selectedSlice';
import { selectIsCardSelected } from '@/store/selectedSlice/selectors/selectors';
import type { CardItem } from '@/shared/constants/types';
import Card from '../card/Card';

interface Props {
  id: string;
  name: string;
  description: string;
  artist?: string;
  imageUrl?: string;
  className?: string;
  showArtist?: boolean;
  imageClassName?: string;
  showCheckbox?: boolean;
}

function CardWithSelection(props: Props) {
  const dispatch = useAppDispatch();
  const isSelected = useAppSelector((state) =>
    selectIsCardSelected(state, props.id)
  );

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();

    if (event.target.checked) {
      const card: CardItem = {
        id: props.id,
        name: props.name,
        description: props.description,
        imageUrl: props.imageUrl,
      };

      dispatch(selectItem(card));
    } else {
      dispatch(unselectItem(props.id));
    }
  };

  const handleCheckboxClick = (event: MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
  };

  return (
    <Card
      {...props}
      isSelected={isSelected}
      onCheckboxChange={handleCheckboxChange}
      onCheckboxClick={handleCheckboxClick}
    />
  );
}

export default CardWithSelection;
