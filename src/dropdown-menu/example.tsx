import { DropdownMenu } from '.';
import { Button } from '../button';

export default function DropdownMenuExample() {
  return (
    <div className="flex justify-center h-[2000px] items-start">
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <Button variant="outline">Trigger Menu</Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className="w-96">
          <DropdownMenu.Label>My Actions</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Item onClick={() => alert('Test Item 1')}>
            Item 1
          </DropdownMenu.Item>
          <DropdownMenu.Item onClick={() => console.log('Item 2')}>
            Item 2
          </DropdownMenu.Item>
          <DropdownMenu.Item>Item 3</DropdownMenu.Item>

          <DropdownMenu.Separator />

          <DropdownMenu.Item onClick={() => alert('Test Item 1')}>
            Logout
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  );
}
