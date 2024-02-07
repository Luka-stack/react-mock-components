import { cn } from '../lib/utils';
import { CSSTransition } from 'react-transition-group';
import {
  ComponentPropsWithoutRef,
  ElementRef,
  Fragment,
  ReactNode,
  cloneElement,
  forwardRef,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';

import {
  ActionTypes,
  NavigationProvider,
  useNavigationDispatch,
  useNavigationStore,
} from './navigation-menu.context';

const NavigationMenuList = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative">
      <ul className="flex items-center justify-center flex-1 space-x-1 list-none">
        {children}
      </ul>
    </div>
  );
};

const NavigationMenuItem = ({ children }: { children: ReactNode }) => {
  return <li>{children}</li>;
};

const NavigationMenuTrigger = forwardRef<
  ElementRef<'button'>,
  ComponentPropsWithoutRef<'button'>
>(({ children, className, onClick, ...props }, ref) => {
  const dispatch = useNavigationDispatch();

  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 duration-150 linear text-slate-200 border-slate-500 hover:bg-slate-700/30 border h-10 px-4 py-2',
        className
      )}
      {...props}
      onClick={(e) => {
        dispatch({ type: ActionTypes.Trigger, contentId: props.id! });
        onClick?.(e);
      }}
    >
      {children}
    </button>
  );
});

const NavigationMenuContent = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'>
>(({ children, className, ...props }, ref) => {
  const dispatch = useNavigationDispatch();

  useLayoutEffect(() => {
    dispatch({
      type: ActionTypes.Register,
      id: props.id!,
      node: cloneElement(
        <div
          ref={ref}
          className={cn('absolute top-0 left-0 w-96', className)}
          {...props}
        >
          {children}
        </div>
      ),
    });
  }, [children, className, dispatch, props, ref]);

  return null;
});

const NavigationViewport = () => {
  const [dataOpen, setDataOpen] = useState(false);
  const { open, contentId, contents } = useNavigationStore();

  const viewportContent = useMemo(() => {
    return Array.from(contents.entries()).map(([id, node]) => (
      <CSSTransition
        key={id}
        in={contentId === id}
        unmountOnExit
        timeout={200}
        classNames={'navigation-menu-item-appear'}
      >
        {node}
      </CSSTransition>
    ));
  }, [contentId, contents]);

  return (
    <div
      className="absolute left-0 top-[100%] flex justify-center"
      data-open={dataOpen}
    >
      <CSSTransition
        in={open}
        unmountOnExit
        timeout={200}
        classNames="navigation-menu-appear"
        onEntered={() => setDataOpen(true)}
        onExit={() => setDataOpen(false)}
      >
        <Fragment>{viewportContent}</Fragment>
      </CSSTransition>
    </div>
  );
};

type NavigationMenuProps = {
  children: ReactNode;
};

const NavigationMenu = ({ children }: NavigationMenuProps) => {
  return (
    <NavigationProvider>
      <nav className="relative z-10 flex items-center justify-center flex-1 max-w-max text-slate-200">
        <div className="relative">{children}</div>
        <NavigationViewport />
      </nav>
    </NavigationProvider>
  );
};

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
};
