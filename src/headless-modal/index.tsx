import { Dialog as HeadlessDialog, Transition } from '@headlessui/react';
import {
  ComponentPropsWithoutRef,
  ElementRef,
  Fragment,
  ReactNode,
  forwardRef,
} from 'react';
import {
  ActionTypes,
  ModalProvider,
  useModalDispatch,
  useModalStore,
} from './modal.context';
import { Slot } from '../components/slot';
import { cn } from '../lib/utils';

const ModalTrigger = forwardRef<
  ElementRef<'button'>,
  ComponentPropsWithoutRef<'button'> & {
    asChild?: boolean;
  }
>(({ asChild, children, onClick, ...props }, ref) => {
  const dispatch = useModalDispatch();

  if (asChild) {
    return (
      <Slot
        onClick={() => {
          dispatch({ type: ActionTypes.Open });
        }}
        {...props}
      >
        {children}
      </Slot>
    );
  }

  return (
    <button
      ref={ref}
      onClick={(event) => {
        dispatch({ type: ActionTypes.Open });
        onClick && onClick(event);
      }}
      {...props}
    >
      {children}
    </button>
  );
});

const ModalContent = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'>
>(({ children, className, ...props }, ref) => {
  const { open } = useModalStore();
  const dispatch = useModalDispatch();

  return (
    <Transition appear as={Fragment} show={open}>
      <HeadlessDialog
        as="div"
        className="relative z-10"
        onClose={() => {
          dispatch({ type: ActionTypes.Close });
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HeadlessDialog.Panel
                ref={ref}
                className={cn(
                  'w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-sm transition-all bg-slate-900 text-slate-200 border border-slate-700 shadow-slate-700',
                  className
                )}
                {...props}
              >
                {children}
              </HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  );
});

const ModalHeader = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col space-y-1.5 text-center sm:text-left',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

const ModalTitle = forwardRef<ElementRef<'h2'>, ComponentPropsWithoutRef<'h2'>>(
  ({ children, className, ...props }, ref) => {
    return (
      <HeadlessDialog.Title
        as="h2"
        ref={ref}
        className={cn(
          'text-lg font-semibold leading-none tracking-tight',
          className
        )}
        {...props}
      >
        {children}
      </HeadlessDialog.Title>
    );
  }
);

const ModalDescription = forwardRef<
  ElementRef<'p'>,
  ComponentPropsWithoutRef<'p'>
>(({ children, className, ...props }, ref) => {
  return (
    <HeadlessDialog.Description
      as="p"
      ref={ref}
      className={cn('text-sm', className)}
      {...props}
    >
      {children}
    </HeadlessDialog.Description>
  );
});

const ModalFooter = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

const ModalAction = forwardRef<
  ElementRef<'button'>,
  ComponentPropsWithoutRef<'button'> & {
    asChild?: boolean;
  }
>(({ children, className, onClick, asChild, ...props }, ref) => {
  const dispatch = useModalDispatch();

  if (asChild) {
    return (
      <Slot
        id={'modal-trigger'}
        onClick={() => {
          dispatch({ type: ActionTypes.Close });
        }}
        {...props}
      >
        {children}
      </Slot>
    );
  }

  return (
    <button
      ref={ref}
      className={cn(
        'w-full sm:w-auto sm:px-4 sm:py-2 sm:rounded-md sm:text-base bg-slate-200 text-slate-900 hover:bg-slate-300',
        className
      )}
      onClick={(event) => {
        onClick && onClick(event);
        dispatch({ type: ActionTypes.Close });
      }}
      {...props}
    >
      {children}
    </button>
  );
});

const ModalClose = forwardRef<
  ElementRef<'button'>,
  ComponentPropsWithoutRef<'button'> & {
    asChild?: boolean;
  }
>(({ children, className, asChild, onClick, ...props }, ref) => {
  const dispatch = useModalDispatch();

  if (asChild) {
    return (
      <Slot
        id={'modal-trigger'}
        onClick={() => {
          dispatch({ type: ActionTypes.Close });
        }}
        {...props}
      >
        {children}
      </Slot>
    );
  }

  return (
    <button
      ref={ref}
      className={cn(
        'w-full sm:w-auto sm:px-4 sm:py-2 sm:rounded-md sm:text-base bg-gray-800 hover:bg-gray-700 text-gray-200',
        className
      )}
      onClick={(event) => {
        onClick && onClick(event);
        dispatch({ type: ActionTypes.Close });
      }}
      {...props}
    >
      {children}
    </button>
  );
});

const Modal = ({
  children,
  open,
  onOpenChange,
}: {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (state: boolean) => void;
}) => {
  return (
    <ModalProvider open={open} onOpenChange={onOpenChange}>
      {children}
    </ModalProvider>
  );
};

export {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalAction,
  ModalClose,
};
