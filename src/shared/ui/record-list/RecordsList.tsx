import { selectAllRecords } from '@/store/formSlice/selectors/selectors';
import { useAppSelector } from '@/store/hooks/hooks';
import RecordCard from '../record-card/RecordCard';

function RecordsList() {
  const records = useAppSelector(selectAllRecords);

  if (!records.length) {
    return <p>No submissions yet.</p>;
  }

  return (
    <ul>
      {records.map((record) => (
        <li key={record.id}>
          <RecordCard record={record} />
        </li>
      ))}
    </ul>
  );
}

export default RecordsList;
