import OutsideClickHandler from 'react-outside-click-handler';
import { CSSTransition } from 'react-transition-group';
import {
  ComponentPropsWithoutRef,
  ElementRef,
  FC,
  Fragment,
  ReactNode,
  forwardRef,
} from 'react';

import { cn } from '../lib/utils';
import { ReactPortal } from '../components/react-portal';
import {
  ActionTypes,
  ModalProvider,
  useModalDispatch,
  useModalStore,
} from './modal.context';
import { Slot } from '../components/slot';
import { XIcon } from '../components/svgs/x-icon';

const Trigger = forwardRef<
  ElementRef<'button'>,
  ComponentPropsWithoutRef<'button'> & {
    asChild?: boolean;
  }
>(({ asChild, children, onClick, ...props }, ref) => {
  const dispatch = useModalDispatch();

  if (asChild) {
    return (
      <Slot
        id={'modal-trigger'}
        onClick={(event) => {
          dispatch({ type: ActionTypes.Open });
          onClick && onClick(event);
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
      id={'modal-trigger'}
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

const Content = forwardRef<ElementRef<'div'>, ComponentPropsWithoutRef<'div'>>(
  ({ children, className, ...props }, ref) => {
    const { open } = useModalStore();
    const dispatch = useModalDispatch();

    return (
      <ReactPortal>
        <CSSTransition
          in={open}
          unmountOnExit
          timeout={100}
          classNames={'modal-appear'}
        >
          <div className="fixed inset-0 bg-black/50">
            <OutsideClickHandler
              onOutsideClick={() => dispatch({ type: ActionTypes.Close })}
            >
              <div
                data-modal-open={open}
                ref={ref}
                className={cn(
                  'modal fixed border-slate-700 border shadow-sm rounded-md shadow-slate-500 p-4 bg-slate-900 w-96 text-slate-200 grid gap-4',
                  className
                )}
                {...props}
              >
                <Fragment>
                  {children}
                  <button
                    onClick={() => dispatch({ type: ActionTypes.Close })}
                    className="absolute p-1 rounded-full top-2 right-2 hover:bg-black/80"
                  >
                    <XIcon height={16} width={16} />
                  </button>
                </Fragment>
              </div>
            </OutsideClickHandler>
          </div>
        </CSSTransition>
      </ReactPortal>
    );
  }
);

const Header = forwardRef<ElementRef<'div'>, ComponentPropsWithoutRef<'div'>>(
  ({ children, className, ...props }, ref) => {
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
  }
);

const Title = forwardRef<ElementRef<'h2'>, ComponentPropsWithoutRef<'h2'>>(
  ({ children, className, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn(
          'text-lg font-semibold leading-none tracking-tight',
          className
        )}
        {...props}
      >
        {children}
      </h2>
    );
  }
);

const Description = forwardRef<ElementRef<'p'>, ComponentPropsWithoutRef<'p'>>(
  ({ children, className, ...props }, ref) => {
    return (
      <p ref={ref} className={cn('text-sm', className)} {...props}>
        {children}
      </p>
    );
  }
);

const Footer = forwardRef<ElementRef<'div'>, ComponentPropsWithoutRef<'div'>>(
  ({ children, className, ...props }, ref) => {
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
  }
);

const Action = forwardRef<
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
        onClick={(event) => {
          dispatch({ type: ActionTypes.Close });
          onClick && onClick(event);
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

const Close = forwardRef<
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
        onClick={(event) => {
          dispatch({ type: ActionTypes.Close });
          onClick && onClick(event);
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

interface ModalProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (state: boolean) => void;
}

interface ModalComponent extends React.FC<ModalProps> {
  Trigger: FC<ComponentPropsWithoutRef<typeof Trigger>>;
  Content: FC<ComponentPropsWithoutRef<typeof Content>>;
  Header: FC<ComponentPropsWithoutRef<typeof Header>>;
  Title: FC<ComponentPropsWithoutRef<typeof Title>>;
  Description: FC<ComponentPropsWithoutRef<typeof Description>>;
  Footer: FC<ComponentPropsWithoutRef<typeof Footer>>;
  Action: FC<ComponentPropsWithoutRef<typeof Action>>;
  Close: FC<ComponentPropsWithoutRef<typeof Close>>;
}

const Modal: ModalComponent = ({
  children,
  open,
  onOpenChange,
}: ModalProps) => {
  return (
    <ModalProvider open={open} onOpenChange={onOpenChange}>
      {children}
    </ModalProvider>
  );
};

Modal.Content = Content;
Modal.Trigger = Trigger;
Modal.Header = Header;
Modal.Title = Title;
Modal.Description = Description;
Modal.Footer = Footer;
Modal.Action = Action;
Modal.Close = Close;

export { Modal };
