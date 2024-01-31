import {
  ComponentPropsWithoutRef,
  ElementRef,
  ReactNode,
  forwardRef,
  useEffect,
  useRef,
} from 'react';
import {
  ActionTypes,
  SheetProvider,
  useSheetDispatch,
  useSheetStore,
} from '../cards/sheet.contex';
import { Slot } from '../components/slot';
import { ReactPortal } from '../components/react-portal';
import { CSSTransition } from 'react-transition-group';
import { cn } from '../lib/utils';
import OutsideClickHandler from 'react-outside-click-handler';
import { XIcon } from '../components/svgs/x-icon';
import { VariantProps, cva } from 'class-variance-authority';

const OverflowHidden = `
  body {
    overflow: hidden !important;
    overscroll-behavior: contain;
    position: relative !important;
    padding-left: 0px;
    padding-top: 0px;
    padding-right: 0px;
    margin-left:0;
    margin-top:0;
    margin-right: 17px !important;
  }
`;

const SheetTriger = forwardRef<
  ElementRef<'button'>,
  ComponentPropsWithoutRef<'button'> & {
    asChild?: boolean;
  }
>(({ asChild, children, onClick, ...props }, ref) => {
  const dispatch = useSheetDispatch();

  if (asChild) {
    return (
      <Slot
        id={'sheet-trigger'}
        onClick={() => dispatch({ type: ActionTypes.Open })}
        {...props}
      >
        {children}
      </Slot>
    );
  }

  return (
    <button
      ref={ref}
      id={'sheet-trigger'}
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

const sheetVariants = cva(
  'sheet fixed z-50 bg-slate-900 border border-slate-700 text-slate-200 p-4 flex flex-col space-y-5 ',
  {
    variants: {
      side: {
        left: 'top-0 bottom-0 left-0 slide-in-from-left slide-out-to-left w-96',
        right:
          'top-0 bottom-0 right-0 slide-in-from-right slide-out-to-right w-96',
        bottom:
          'bottom-0 left-0 right-0 slide-in-from-bottom slide-out-to-bottom h-64',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  }
);

interface SheetContentProps
  extends ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = forwardRef<ElementRef<'div'>, SheetContentProps>(
  ({ children, className, side, ...props }, ref) => {
    const { open } = useSheetStore();
    const dispatch = useSheetDispatch();
    const styleElement = useRef<HTMLStyleElement | null>(null);

    useEffect(() => {
      if (open) {
        styleElement.current = document.createElement('style');
        styleElement.current.appendChild(
          document.createTextNode(OverflowHidden)
        );
        document.head.appendChild(styleElement.current);
      } else if (styleElement.current) {
        document.head.removeChild(styleElement.current as Node);
        styleElement.current = null;
      }
    }, [open]);

    return (
      <ReactPortal>
        <CSSTransition
          in={open}
          unmountOnExit
          timeout={200}
          classNames={'sheet-appear'}
        >
          <div className="fixed inset-0 bg-black/50">
            <OutsideClickHandler
              onOutsideClick={() => dispatch({ type: ActionTypes.Close })}
            >
              <div
                ref={ref}
                className={cn(sheetVariants({ side }), className)}
                data-state={open}
                {...props}
              >
                {children}

                <button
                  onClick={() => dispatch({ type: ActionTypes.Close })}
                  className="absolute p-1 rounded-full -top-2 right-2 hover:bg-black/80"
                >
                  <XIcon height={16} width={16} />
                </button>
              </div>
            </OutsideClickHandler>
          </div>
        </CSSTransition>
      </ReactPortal>
    );
  }
);

const SheetHeader = forwardRef<
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

const SheetTitle = forwardRef<ElementRef<'h2'>, ComponentPropsWithoutRef<'h2'>>(
  ({ children, className, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn(
          'font-semibold leading-none tracking-tight text-lg',
          className
        )}
        {...props}
      >
        {children}
      </h2>
    );
  }
);

const SheetDescription = forwardRef<
  ElementRef<'p'>,
  ComponentPropsWithoutRef<'p'>
>(({ children, className, ...props }, ref) => {
  return (
    <p ref={ref} className={cn('text-sm', className)} {...props}>
      {children}
    </p>
  );
});

const SheetFooter = forwardRef<
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

interface SheetActionProps {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
  onClick: (callback: () => void) => void;
}

const SheetAction = ({
  children,
  className,
  asChild,
  onClick,
}: SheetActionProps) => {
  const dispatch = useSheetDispatch();

  if (asChild) {
    return (
      <Slot
        onClick={() => onClick(() => dispatch({ type: ActionTypes.Close }))}
      >
        {children}
      </Slot>
    );
  }

  return (
    <button
      className={cn(
        'w-full sm:w-auto sm:px-4 sm:py-2 sm:rounded-md sm:text-base bg-slate-200 text-slate-900 hover:bg-slate-300',
        className
      )}
      onClick={() => onClick(() => dispatch({ type: ActionTypes.Close }))}
    >
      {children}
    </button>
  );
};

const SheetClose = forwardRef<
  ElementRef<'button'>,
  ComponentPropsWithoutRef<'button'> & {
    asChild?: boolean;
  }
>(({ children, className, asChild, onClick, ...props }, ref) => {
  const dispatch = useSheetDispatch();

  if (asChild) {
    return (
      <Slot
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

interface SheetProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (state: boolean) => void;
}

const Sheet = ({ children, open, onOpenChange }: SheetProps) => {
  return (
    <SheetProvider open={open} onOpenChange={onOpenChange}>
      {children}
    </SheetProvider>
  );
};

export {
  Sheet,
  SheetTriger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetAction,
  SheetClose,
};
