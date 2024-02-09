import { ChevronDown } from 'lucide-react';
import { CSSTransition } from 'react-transition-group';
import {
  ComponentPropsWithoutRef,
  ElementRef,
  ReactNode,
  forwardRef,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';

import { cn, composeRefs } from '../lib/utils';
import {
  NavigationMenuItemProvider,
  useNavigationItemContext,
} from './navigation-menu-item.context';
import {
  ActionTypes,
  NavigationProvider,
  useNavigationDispatch,
  useNavigationStore,
} from './navigation-menu.context';

function makeContentId(baseId: string) {
  return `${baseId}-content`;
}

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
  return (
    <NavigationMenuItemProvider>
      <li>{children}</li>
    </NavigationMenuItemProvider>
  );
};

const NavigationMenuTrigger = forwardRef<
  ElementRef<'button'>,
  ComponentPropsWithoutRef<'button'>
>(({ children, className, ...props }, ref) => {
  const dispatch = useNavigationDispatch();
  const { visibleContentId } = useNavigationStore();
  const baseId = useNavigationItemContext();

  const contentId = makeContentId(baseId);
  const isVisibleContent = visibleContentId === contentId;

  return (
    <button
      ref={ref}
      data-open={isVisibleContent}
      onMouseEnter={() =>
        dispatch({ type: ActionTypes.Trigger, visibleContentId: contentId })
      }
      onMouseLeave={() => dispatch({ type: ActionTypes.Close })}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 duration-150 linear text-slate-200 hover:bg-slate-800 h-10 px-4 py-2',
        isVisibleContent && 'bg-slate-800',
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="open-indicator w-3 h-3 ml-1 mt-[1px]" />
    </button>
  );
});

const NavigationMenuLink = forwardRef<
  ElementRef<'a'>,
  ComponentPropsWithoutRef<'a'>
>(({ children, className, ...props }, ref) => {
  return (
    <a
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 duration-150 linear text-slate-200 hover:bg-slate-800 h-10 px-4 py-2',
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
});

const NavigationMenuContentMounter = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'>
>((props) => {
  const dispatch = useNavigationDispatch();
  const baseId = useNavigationItemContext();
  const contentId = makeContentId(baseId);

  useLayoutEffect(() => {
    dispatch({ type: ActionTypes.Register, id: contentId, node: props });
  }, [dispatch, contentId, props]);

  useLayoutEffect(() => {
    () => {
      dispatch({ type: ActionTypes.Deregister, id: contentId });
    };
  }, [dispatch, contentId]);

  return null;
});

const NavigationMenuContentImpl = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('absolute top-0 left-0 p-4 w-96', className)}
      {...props}
    >
      {children}
    </div>
  );
});

const NavigationViewport = () => {
  const [dataOpen, setDataOpen] = useState(false);
  const [content, setContent] = useState<HTMLDivElement>();
  const { open, visibleContentId, contents } = useNavigationStore();
  const dispatch = useNavigationDispatch();

  const viewportContent = useMemo(() => {
    return Array.from(contents.entries()).map(([id, { ref, ...props }]) => (
      <CSSTransition
        key={id}
        in={visibleContentId === id}
        unmountOnExit
        timeout={200}
        classNames={'navigation-menu-item-appear'}
      >
        <NavigationMenuContentImpl
          {...props}
          ref={composeRefs(ref, (node) => {
            if (visibleContentId === id && node) {
              setContent(node);
            }
          })}
        />
      </CSSTransition>
    ));
  }, [visibleContentId, contents]);

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
        <div
          className="border border-slate-500 rounded-md h-[var(--navigation-menu-viewport-height)] w-[var(--navigation-menu-viewport-width)] relative shadow-sm shadow-slate-500 overflow-hidden mt-1.5"
          style={{
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ['--navigation-menu-viewport-width' as any]: `${content?.offsetWidth}px`,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ['--navigation-menu-viewport-height' as any]: `${content?.offsetHeight}px`,
          }}
          onMouseEnter={() => dispatch({ type: ActionTypes.Enter })}
          onMouseLeave={() => dispatch({ type: ActionTypes.Close })}
        >
          {viewportContent}
        </div>
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
  NavigationMenuLink,
  NavigationMenuContentMounter as NavigationMenuContent,
};
