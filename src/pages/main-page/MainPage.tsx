import { useState } from 'react';
import Modal from '@/shared/ui/modal/Modal';
import Button from '@/shared/ui/button/Button';
import UncontrolledForm from '@/shared/ui/uncotrolled-form/UncontrolledForm';
import RHFForm from '@/shared/ui/rhf-form/RhfForm';
import RecordsList from '@/shared/ui/record-list/RecordsList';

type OpenedFormType = 'uncontrolled' | 'rhf' | null;

function MainPage() {
  const [openedFormType, setOpenedFormType] = useState<OpenedFormType>(null);

  const handleOpenUncontrolledForm = () => {
    setOpenedFormType('uncontrolled');
  };

  const handleOpenRHFForm = () => {
    setOpenedFormType('rhf');
  };

  const handleClose = () => {
    setOpenedFormType(null);
  };

  return (
    <main>
      <div>
        <Button onClick={handleOpenUncontrolledForm} type="button">
          Uncontrolled Form
        </Button>

        <Button onClick={handleOpenRHFForm} type="button">
          React Hook Form
        </Button>
      </div>

      {openedFormType && (
        <Modal onClose={handleClose}>
          {openedFormType === 'uncontrolled' ? (
            <UncontrolledForm onClose={handleClose} />
          ) : (
            <RHFForm onClose={handleClose} />
          )}
        </Modal>
      )}

      <div aria-labelledby="submissions-title">
        <p id="submissions-title">Submitted data</p>
        <RecordsList />
      </div>
    </main>
  );
}

export default MainPage;
