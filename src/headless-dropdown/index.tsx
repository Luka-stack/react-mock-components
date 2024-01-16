import { cn } from '../lib/utils';
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import { VariantProps, cva } from 'class-variance-authority';
import {
  ComponentPropsWithoutRef,
  ElementRef,
  Fragment,
  forwardRef,
} from 'react';

const contentVariants = cva(
  'absolute p-2 mt-2 border rounded-md shadow-md w-max bg-transaprent border-slate-700 text-slate-200 shadow-back h-fit',
  {
    variants: {
      position: {
        left: 'left-0',
        right: 'right-0',
      },
    },
    defaultVariants: {
      position: 'left',
    },
  }
);

const MenuTrigger = HeadlessMenu.Button;

const Menu = forwardRef<ElementRef<'div'>, ComponentPropsWithoutRef<'div'>>(
  ({ children, className, ...props }, ref) => {
    return (
      <HeadlessMenu
        as="div"
        ref={ref}
        className={cn('relative w-fit', className)}
        {...props}
      >
        {children}
      </HeadlessMenu>
    );
  }
);

interface ContentProps
  extends ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof contentVariants> {}

const MenuContent = forwardRef<ElementRef<'div'>, ContentProps>(
  ({ children, className, position, ...props }, ref) => {
    return (
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <HeadlessMenu.Items
          ref={ref}
          className={cn(contentVariants({ position, className }))}
          {...props}
        >
          {children}
        </HeadlessMenu.Items>
      </Transition>
    );
  }
);

const MenuItem = forwardRef<
  ElementRef<'button'>,
  ComponentPropsWithoutRef<'button'>
>(({ children, className, ...props }, ref) => {
  return (
    <HeadlessMenu.Item>
      <button
        ref={ref}
        className={cn(
          'w-full p-2 text-left hover:bg-slate-700/30 text-slate-200 focus:outline-none rounded-md text-sm',
          className
        )}
        {...props}
      >
        {children}
      </button>
    </HeadlessMenu.Item>
  );
});

const MenuLabel = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'w-full p-2 text-left text-slate-200 focus:outline-none text-sm font-semibold',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

const MenuSeparator = () => {
  return <div className="h-px my-1 bg-slate-700" />;
};

export { Menu, MenuContent, MenuItem, MenuTrigger, MenuLabel, MenuSeparator };
