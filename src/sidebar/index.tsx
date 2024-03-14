import { v4 as uuidv4 } from 'uuid';
import {
  ComponentPropsWithoutRef,
  ElementRef,
  createContext,
  forwardRef,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import {
  ActionTypes,
  MediaScreen,
  SidebarProvider,
  useSidebarDispatch,
  useSidebarState,
} from './sidebar-provider';
import { useWindowSize } from '../hooks/use-window-size';
import { useSidebarOutsideClick } from './use-sidebar-outside-click';
import { cn, composeRefs } from '../lib/utils';

function makeContentId(baseId: string) {
  return `${baseId}-content`;
}

// Item Provider

const SidebarItemContext = createContext<string>('');

function useSidebarItem() {
  const context = useContext(SidebarItemContext);

  if (!context) {
    throw new Error('useSidebarItem must be used within a SidebarItemProvider');
  }

  return context;
}
//

const SidebarViewport = () => {
  const dispatch = useSidebarDispatch();
  const { open, visibleContentId, contents, mediaScreen, root } =
    useSidebarState();
  const [windowWidth] = useWindowSize();
  const [width, setWidth] = useState(0);

  const isFloating = useMemo(
    () => windowWidth < mediaScreen,
    [mediaScreen, windowWidth]
  );

  useSidebarOutsideClick(root, open, isFloating, dispatch);

  const viewportContent = useMemo(() => {
    return Array.from(contents).map(([id, { ref, ...props }]) => (
      <CSSTransition
        key={id}
        in={id === visibleContentId}
        timeout={200}
        unmountOnExit
        classNames={'second-sidebar-content'}
      >
        <SidebarContentImpl
          {...props}
          ref={composeRefs(ref, (node) => {
            if (visibleContentId === id && node) {
              setWidth(node.offsetWidth);
            }
          })}
        />
      </CSSTransition>
    ));
  }, [visibleContentId, contents]);

  return (
    <div
      className={cn(
        'transition-[width] duration-200 ease-in-out overflow-hidden w-[var(--sidebar-width)] bg-slate-900',
        isFloating ? 'absolute left-full h-full' : 'w-[var(--sidebar-width)]'
      )}
      style={{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ['--sidebar-width' as any]: `${width}px`,
      }}
    >
      <CSSTransition
        in={open}
        timeout={200}
        classNames={'second-sidebar'}
        unmountOnExit
        onExit={() => setWidth(0)}
      >
        <div
          className={cn(
            'relative h-full overflow-hidden border-slate-500 border-r rounded-lg'
          )}
        >
          {viewportContent}
        </div>
      </CSSTransition>
    </div>
  );
};

const SidebarContentImpl = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('w-40 p-2 h-full absolute text-slate-200', className)}
      {...props}
    >
      {children}
    </div>
  );
});

const SidebarRoot = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'>
>(({ className, children, ...props }, ref) => {
  const dispatch = useSidebarDispatch();

  return (
    <div
      className="relative flex"
      ref={composeRefs(ref, (node) => {
        if (node) {
          dispatch({ type: ActionTypes.RegisterRoot, root: node });
        }
      })}
    >
      <div
        className={cn(
          'h-full flex flex-col border border-slate-500 text-slate-200',
          className
        )}
        {...props}
      >
        {children}
      </div>

      <SidebarViewport />
    </div>
  );
});

// Export

const Sidebar = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'> & {
    mediaScreen?: MediaScreen;
  }
>(({ mediaScreen, className, ...props }, ref) => {
  return (
    <SidebarProvider mediaScreen={mediaScreen}>
      <SidebarRoot ref={ref} className={className} {...props} />
    </SidebarProvider>
  );
});

const SidebarContent = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'thin-scrollbar p-2 space-y-2 overflow-y-auto h-full',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

const SidebarHeader = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('p-2 border-b border-slate-500', className)}
      {...props}
    >
      {children}
    </div>
  );
});

const SidebarFooter = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('p-2 border-t border-slate-500', className)}
      {...props}
    >
      {children}
    </div>
  );
});

const SidebarLink = forwardRef<ElementRef<'a'>, ComponentPropsWithoutRef<'a'>>(
  ({ className, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          'w-full hover:bg-slate-800/50 rounded-md p-2 flex items-center flex-col cursor-pointer',
          className
        )}
        {...props}
      />
    );
  }
);

const SidebarItem = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => {
  const baseId = useRef(uuidv4()).current;

  return (
    <SidebarItemContext.Provider value={baseId}>
      <div className={cn('font-semibold', className)} ref={ref} {...props} />
    </SidebarItemContext.Provider>
  );
});

const SidebarItemTrigger = forwardRef<
  ElementRef<'button'>,
  ComponentPropsWithoutRef<'button'> & {
    activeStyles?: string;
  }
>(({ children, activeStyles, className, ...props }, ref) => {
  const dispatch = useSidebarDispatch();
  const { visibleContentId } = useSidebarState();
  const baseId = useSidebarItem();

  const contentId = makeContentId(baseId);
  const isVisibleContent = visibleContentId === contentId;

  return (
    <button
      ref={ref}
      data-open={isVisibleContent}
      onClick={() => dispatch({ type: ActionTypes.Trigger, contentId })}
      className={cn(
        'w-full hover:bg-slate-800/50 rounded-md p-2 flex items-center flex-col transition-colors duration-200 ease',
        isVisibleContent && 'bg-slate-800/70',
        isVisibleContent && activeStyles,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

const SidebarItemContent = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'>
>((props) => {
  const dispatch = useSidebarDispatch();
  const baseId = useSidebarItem();
  const contentId = makeContentId(baseId);

  useLayoutEffect(() => {
    dispatch({ type: ActionTypes.Register, contentId, props });
  }, [dispatch, contentId, props]);

  useLayoutEffect(() => {
    () => dispatch({ type: ActionTypes.Deregister, contentId });
  }, [dispatch, contentId]);

  return null;
});

export {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarLink,
  SidebarItem,
  SidebarItemTrigger,
  SidebarItemContent,
};
