import { Menu } from '.';
import { Button } from '../button';
import { cn } from '../lib/utils';

export default function MenuExample() {
  return (
    <div className="flex justify-center">
      <Menu>
        {/* Trigger */}
        <Menu.Trigger as={Button} variant={'outline'}>
          Click To Open Menu
        </Menu.Trigger>

        {/* Content */}
        <Menu.Content className="flex flex-col w-48 p-2 border rounded-md border-slate-600 bg-slate-900 text-slate-200">
          <Menu.Item>
            {({ hover }) => (
              <a
                className={cn(
                  'px-2 py-1.5 rounded-md cursor-pointer',
                  hover && 'bg-slate-700/30'
                )}
              >
                Account settings
              </a>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ hover }) => (
              <a
                className={cn(
                  'px-2 py-1.5 rounded-md cursor-pointer',
                  hover && 'bg-slate-700/30'
                )}
              >
                Account settings
              </a>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ hover }) => (
              <a
                className={cn(
                  'px-2 py-1.5 rounded-md cursor-pointer',
                  hover && 'bg-slate-700/30'
                )}
              >
                Account settings
              </a>
            )}
          </Menu.Item>
        </Menu.Content>
        {/* End of the content */}
      </Menu>
    </div>
  );
}
