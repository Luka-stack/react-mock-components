import { Button } from '../button';
import {
  Modal,
  ModalAction,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from '.';
import { useState } from 'react';

export default function HeadlessModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <Modal open={open} onOpenChange={setOpen}>
        {/* <Modal> */}
        <ModalTrigger asChild>
          <Button variant="outline">Trigger Modal</Button>
        </ModalTrigger>

        <ModalContent className="w-96">
          <ModalHeader>
            <ModalTitle>Modal Title</ModalTitle>
            <ModalDescription>Modal Description</ModalDescription>
          </ModalHeader>

          <div className="gap-4 py-4 gird">
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </div>

          <ModalFooter>
            <ModalClose>Close</ModalClose>
            <ModalAction>Continue</ModalAction>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
