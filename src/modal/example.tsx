import { Modal } from '.';
import { Button } from '../button';

export default function ModalExample() {
  return (
    <div className="">
      <Modal>
        <Modal.Trigger asChild>
          <Button variant="outline">Trigger Modal</Button>
        </Modal.Trigger>

        <Modal.Content className="w-96">
          <Modal.Header>
            <Modal.Title>Modal Title</Modal.Title>
            <Modal.Description>Modal Description</Modal.Description>
          </Modal.Header>

          <div className="gap-4 py-4 gird">
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </div>

          <Modal.Footer>
            <Modal.Close>Close</Modal.Close>
            <Modal.Action asChild>
              <Button
                onClick={() => alert('Submitted form')}
                variant={'default'}
              >
                Action
              </Button>
            </Modal.Action>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </div>
  );
}
