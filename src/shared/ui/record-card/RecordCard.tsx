import { useEffect } from 'react';
import { clearNewFlag } from '@/store/formSlice/formSlice';
import { useAppDispatch } from '@/store/hooks/hooks';
import type { FormProps } from '@/store/formSlice/types/types';

interface Props {
  record: FormProps;
}

function RecordCard({ record }: Props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!record.isNew) return;

    const timerId = window.setTimeout(() => {
      dispatch(clearNewFlag(record.id));
    }, 3000);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [dispatch, record.id, record.isNew]);

  return (
    <article
      className={record.isNew ? 'record-card record-card--new' : 'record-card'}
    >
      {record.imageBase64 && (
        <img
          src={record.imageBase64}
          alt={record.name}
          width={100}
          height={100}
        />
      )}

      <h3>{record.name}</h3>
      <p>{record.email}</p>
      <p>{record.age}</p>
      <p>{record.gender}</p>
      <p>{record.country}</p>
      <p>{record.source}</p>
    </article>
  );
}

export default RecordCard;
