import { useState } from 'react';
import Modal from '@/shared/ui/modal/Modal';
import Button from '@/shared/ui/button/Button';
import UncontrolledBasicForm from '@/shared/ui/uncotrolled-basic-form/UncontrolledBasicForm';

function MainPage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <main>
      <Button onClick={handleOpen}>Open Form</Button>

      {isOpen && (
        <Modal onClose={handleClose}>
          <UncontrolledBasicForm onClose={handleClose} />
        </Modal>
      )}
    </main>
  );
}

export default MainPage;
