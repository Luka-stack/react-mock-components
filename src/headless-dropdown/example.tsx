import {
  Menu,
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuSeparator,
  MenuTrigger,
} from '.';
import { Button } from '../button';

export default function HeadlessDropdowmExample() {
  return (
    <div className="flex justify-center h-[2000px] items-start">
      <Menu className="">
        <MenuTrigger as={Button} variant={'outline'}>
          Trigger Menu
        </MenuTrigger>

        <MenuContent className="w-56" position={'right'}>
          <MenuLabel>My Actions</MenuLabel>
          <MenuSeparator />
          <MenuItem onClick={() => alert('item 1')}>Item 1</MenuItem>
          <MenuItem onClick={() => console.log('item 2')}>Item 2</MenuItem>
          <MenuItem>Item 3</MenuItem>
          <MenuSeparator />
          <MenuItem>Logout</MenuItem>
        </MenuContent>
      </Menu>
    </div>
  );
}
