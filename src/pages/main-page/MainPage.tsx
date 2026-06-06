import { useState } from 'react';
import Modal from '@/shared/ui/modal/Modal';
import Button from '@/shared/ui/button/Button';

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

      <Modal isActive={isOpen} onClose={handleClose}>
        <p>Form will be here</p>
      </Modal>
    </main>
  );
}

export default MainPage;
