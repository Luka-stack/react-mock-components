import { CSSTransition } from 'react-transition-group';
import OutsideClickHandler from 'react-outside-click-handler';
import React, {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ElementRef,
  FC,
  MutableRefObject,
  forwardRef,
  useEffect,
  useRef,
} from 'react';

import { cn } from '../lib/utils';
import { Slot } from '../components/slot';
import { ReactPortal } from '../components/react-portal';
import { useCombinedRefs } from '../hooks/use-combine-refs.hook';
import {
  ActionTypes,
  DropdownMenuProvider,
  useDropdownAction,
  useDropdownStore,
} from './dropdown-menu.context';

const ContentTopMargin = 4;

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

const Trigger = forwardRef<
  ElementRef<'button'>,
  ComponentPropsWithoutRef<'button'> & {
    asChild?: boolean;
  }
>(({ asChild, children, onClick, ...props }, ref) => {
  const dispatch = useDropdownAction();

  if (asChild) {
    return (
      <Slot
        {...props}
        id={'dropdown-trigger'}
        onClick={() => {
          dispatch({ type: ActionTypes.Open });
        }}
      >
        {children}
      </Slot>
    );
  }

  return (
    <button
      {...props}
      ref={ref}
      id={'dropdown-trigger'}
      onClick={(event) => {
        dispatch({ type: ActionTypes.Open });
        onClick && onClick(event);
      }}
    >
      {children}
    </button>
  );
});

const Content = forwardRef<ElementRef<'div'>, ComponentPropsWithoutRef<'div'>>(
  ({ children, className, ...props }, ref) => {
    const { open } = useDropdownStore();
    const dispatch = useDropdownAction();
    const styleElement = useRef<HTMLStyleElement | null>(null);

    const [position, setPosition] = React.useState({ left: 0, top: 0 });

    const content = useRef<ElementRef<'div'>>(null);
    const combinedRefs = useCombinedRefs<HTMLDivElement>(
      ref as MutableRefObject<HTMLDivElement>,
      content as MutableRefObject<HTMLDivElement>
    );

    useEffect(() => {
      if (open) {
        document.body.style.pointerEvents = 'none';
        styleElement.current = document.createElement('style');
        styleElement.current.appendChild(
          document.createTextNode(OverflowHidden)
        );
        document.head.appendChild(styleElement.current);
      } else {
        document.body.style.pointerEvents = '';

        if (styleElement.current) {
          document.head.removeChild(styleElement.current as Node);
          styleElement.current = null;
        }
      }
    }, [open]);

    const handlePositionChange = (node: HTMLElement) => {
      const trigger = document.getElementById('dropdown-trigger');

      if (!trigger) return;

      const positionShift = (node.offsetWidth - trigger.offsetWidth) / 2;

      const canPutRight = trigger.getBoundingClientRect().left >= positionShift;
      const canShiftRight =
        window.innerWidth - trigger.getBoundingClientRect().right >=
        positionShift;
      const canPutBottom =
        window.innerHeight - trigger.getBoundingClientRect().bottom >=
        node.offsetHeight + ContentTopMargin;
      const canPutTop =
        trigger.getBoundingClientRect().top >=
        node.offsetHeight + ContentTopMargin;

      let top = 0;
      let left = 0;

      if (canPutRight && canShiftRight) {
        left = trigger.getBoundingClientRect().left - positionShift;
      } else if (canPutRight) {
        left = trigger.getBoundingClientRect().left - 2 * positionShift;
      } else {
        left = trigger.getBoundingClientRect().left;
      }

      if (canPutBottom || !canPutTop) {
        top = trigger.getBoundingClientRect().bottom + ContentTopMargin;
      } else {
        top =
          trigger.getBoundingClientRect().top -
          node.offsetHeight -
          ContentTopMargin;
      }

      setPosition({ top, left });
    };

    return (
      <ReactPortal>
        <OutsideClickHandler
          onOutsideClick={() => dispatch({ type: ActionTypes.Close })}
        >
          <CSSTransition
            in={open}
            unmountOnExit
            timeout={200}
            classNames={'dropdown-menu'}
            onEnter={handlePositionChange}
          >
            <div
              style={position}
              data-dropdown-open={open}
              {...props}
              ref={combinedRefs}
              className={cn(
                'absolute w-max p-2 bg-transparent border rounded-md shadow-md border-slate-700 text-slate-200 shadow-black h-fit pointer-events-auto focus:ring-2 ring-white top-20',
                className
              )}
            >
              {children}
            </div>
          </CSSTransition>
        </OutsideClickHandler>
      </ReactPortal>
    );
  }
);

const Item = forwardRef<
  ElementRef<'button'>,
  ComponentPropsWithoutRef<'button'>
>(({ children, className, onClick, ...props }, ref) => {
  const dispatch = useDropdownAction();

  return (
    <button
      className={cn(
        'w-full p-2 text-left hover:bg-slate-700/30 text-slate-200 focus:outline-none rounded-md text-sm',
        className
      )}
      onClick={(event) => {
        onClick && onClick(event);
        dispatch({ type: ActionTypes.Close });
      }}
      {...props}
      ref={ref}
    >
      {children}
    </button>
  );
});

const Label = forwardRef<ElementRef<'div'>, ComponentPropsWithoutRef<'div'>>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        className={cn(
          'w-full p-2 text-left text-slate-200 focus:outline-none text-sm font-semibold pointer-events-auto',
          className
        )}
        {...props}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

const Separator = () => {
  return <div className={'h-px bg-slate-700'} />;
};

interface DropdowmMenuProps {
  children: React.ReactNode;
}

interface DropdowmMenuComponent extends FC<DropdowmMenuProps> {
  Trigger: FC<ComponentPropsWithRef<typeof Trigger>>;
  Content: FC<ComponentPropsWithRef<typeof Content>>;
  Item: FC<ComponentPropsWithRef<typeof Item>>;
  Label: FC<ComponentPropsWithRef<typeof Label>>;
  Separator: FC<ComponentPropsWithoutRef<typeof Separator>>;
}

const DropdownMenu: DropdowmMenuComponent = ({
  children,
}: DropdowmMenuProps) => {
  return <DropdownMenuProvider>{children}</DropdownMenuProvider>;
};

DropdownMenu.Trigger = Trigger;
DropdownMenu.Content = Content;
DropdownMenu.Item = Item;
DropdownMenu.Label = Label;
DropdownMenu.Separator = Separator;

export { DropdownMenu };
