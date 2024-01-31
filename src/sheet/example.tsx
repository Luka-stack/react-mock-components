import { ElementRef, useRef, useState } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTriger,
} from '.';
import { Button } from '../button';

export default function SheetExample() {
  const ref = useRef<ElementRef<'button'>>(null);
  const [value, setValue] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value === 'finish') {
      ref.current?.click();
    }
  };

  return (
    <div>
      <Sheet>
        <SheetTriger asChild>
          <Button>Open</Button>
        </SheetTriger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={onSubmit} className="flex flex-col space-y-10">
            <div>
              <label>Test</label>
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full"
              />
            </div>

            <SheetFooter>
              <SheetClose ref={ref}>Close</SheetClose>

              <Button type="submit">Save changes</Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
