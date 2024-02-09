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
>(({ children, className, ...props }, ref) => {
  const dispatch = useNavigationDispatch();
  const { contentId } = useNavigationStore();

  return (
    <button
      ref={ref}
      data-open={contentId === props.id}
      onMouseEnter={() =>
        dispatch({ type: ActionTypes.Trigger, contentId: props.id! })
      }
      onMouseLeave={() => dispatch({ type: ActionTypes.Close })}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 duration-150 linear text-slate-200 hover:bg-slate-800 h-10 px-4 py-2',
        contentId === props.id && 'bg-slate-800',
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="open-indicator w-3 h-3 ml-1 mt-[1px]" />
    </button>
  );
});

const NavigationMenuContentMounter = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'>
>((props) => {
  const dispatch = useNavigationDispatch();

  useLayoutEffect(() => {
    dispatch({ type: ActionTypes.Register, id: props.id!, node: props });
  }, [dispatch, props.id, props]);

  useLayoutEffect(() => {
    () => {
      dispatch({ type: ActionTypes.Deregister, id: props.id! });
    };
  }, [dispatch, props.id]);

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

// const NavigationMenuViewport = ({
//   children,
//   ...props
// }: ComponentPropsWithoutRef<'div'>) => {
//   const ref = useRef<ElementRef<'div'>>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (ref.current && !ref.current.contains(event.target as Node)) {
//         alert('click outside');
//       }
//     };

//     document.addEventListener('click', handleClickOutside);

//     return () => {
//       document.removeEventListener('click', handleClickOutside);
//     };
//   }, []);

//   return (
//     <div ref={ref} {...props}>
//       {children}
//     </div>
//   );
// };

const NavigationViewport = () => {
  const [dataOpen, setDataOpen] = useState(false);
  const [content, setContent] = useState<any>();
  const { open, contentId, contents } = useNavigationStore();
  const dispatch = useNavigationDispatch();

  const viewportContent = useMemo(() => {
    return Array.from(contents.entries()).map(([id, { ref, ...props }]) => (
      <CSSTransition
        key={id}
        in={contentId === id}
        unmountOnExit
        timeout={200}
        classNames={'navigation-menu-item-appear'}
      >
        <NavigationMenuContentImpl
          {...props}
          ref={composeRefs(ref, (node) => {
            if (contentId === id && node) {
              setContent(node);
            }
          })}
        />
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
  NavigationMenuContentMounter as NavigationMenuContent,
};
