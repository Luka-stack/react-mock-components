import {
  ComponentPropsWithoutRef,
  ElementRef,
  ReactNode,
  forwardRef,
  useCallback,
  useState,
} from 'react';
import {
  ActionTypes,
  TooltipProvider,
  useTooltipDispatch,
  useTooltipStore,
} from './tooltip.context';
import { cn } from '../lib/utils';
import { CSSTransition } from 'react-transition-group';
import { Button } from '../button';
import { Slot } from '../components/slot';

const ContentTopMargin = 4;

function makeTriggerId(baseId: string) {
  return `${baseId}-trigger`;
}

const Trigger = forwardRef<
  ElementRef<'button'>,
  ComponentPropsWithoutRef<'button'> & {
    asChild?: boolean;
  }
>(({ asChild, children, onMouseEnter, onMouseLeave, ...props }, ref) => {
  const dispatch = useTooltipDispatch();
  const { baseId } = useTooltipStore();

  const triggerId = makeTriggerId(baseId);

  if (asChild) {
    return (
      <Slot
        {...props}
        id={triggerId}
        onMouseEnter={(event) => {
          onMouseEnter && onMouseEnter(event);
          dispatch({ type: ActionTypes.Enter });
        }}
        onMouseLeave={(event) => {
          onMouseLeave && onMouseLeave(event);
          dispatch({ type: ActionTypes.Close });
        }}
      >
        {children}
      </Slot>
    );
  }

  return (
    <Button
      ref={ref}
      id={triggerId}
      variant={'outline'}
      onMouseEnter={(event) => {
        onMouseEnter && onMouseEnter(event);
        dispatch({ type: ActionTypes.Enter });
      }}
      onMouseLeave={(event) => {
        onMouseLeave && onMouseLeave(event);
        dispatch({ type: ActionTypes.Close });
      }}
      {...props}
    >
      {children}
    </Button>
  );
});

const TooltipContent = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => {
  const { open, baseId } = useTooltipStore();
  const dispatch = useTooltipDispatch();
  const [position, setPosition] = useState({ left: 0, top: 0 });

  const handleOnEnter = useCallback(
    (node: HTMLElement) => {
      const trigger = document.getElementById(makeTriggerId(baseId));

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
    },
    [baseId]
  );

  return (
    <CSSTransition
      in={open}
      timeout={100}
      unmountOnExit
      classNames={'tooltip-appear'}
      onEnter={handleOnEnter}
    >
      <div
        data-open={open}
        className="fixed top-0 left-0 z-50 tooltip min-w-max"
        style={position}
        onMouseEnter={() => dispatch({ type: ActionTypes.Enter })}
        onMouseLeave={() => dispatch({ type: ActionTypes.Close })}
      >
        <div
          ref={ref}
          className={cn(
            'z-50 overflow-hidden rounded-md border border-slate-500 bg-inherit px-3 py-1.5 text-sm shadow-md text-slate-400',
            className
          )}
          {...props}
        />
      </div>
    </CSSTransition>
  );
});

type TooltipProps = {
  children: ReactNode;
};

const Tooltip = ({ children }: TooltipProps) => {
  return <TooltipProvider>{children}</TooltipProvider>;
};

export { Tooltip, Trigger, TooltipContent };
