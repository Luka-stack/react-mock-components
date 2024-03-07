import {
  ComponentPropsWithoutRef,
  ElementRef,
  ReactNode,
  createContext,
  createElement,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { cn } from '../lib/utils';
import { ChevronDown, ChevronsRightIcon, LucideIcon } from 'lucide-react';
import AnimateHeight from 'react-animate-height';

type Dispatch = (status: boolean) => void;

const NavSidebarStateContext = createContext<boolean>(true);
const NavSidebarDispatchContext = createContext<Dispatch | null>(null);

function useNavSidebarState() {
  const context = useContext(NavSidebarStateContext);

  if (typeof context !== 'boolean') {
    throw new Error(
      'useNavSidebarState must be used within a NavSidebarProvider'
    );
  }

  return context;
}

function useNavSidebarDispatch() {
  const context = useContext(NavSidebarDispatchContext);

  if (!context) {
    throw new Error(
      'useNavSidebarDispatch must be used within a NavSidebarProvider'
    );
  }

  return context;
}

type NavSidebarProps = {
  open?: boolean;
  children: ReactNode;
  onOpenChange?: (state: boolean) => void;
};

const NavSidebar = ({ open, children, onOpenChange }: NavSidebarProps) => {
  const [defaultState, defaultDispatch] = useState(true);

  const state = useMemo(() => {
    if (open !== undefined) {
      return open;
    } else {
      return defaultState;
    }
  }, [open, defaultState]);

  const dispatch = useCallback(
    (status: boolean) => {
      if (onOpenChange) {
        onOpenChange(status);
      } else {
        defaultDispatch(status);
      }
    },
    [defaultDispatch, onOpenChange]
  );

  return (
    <NavSidebarDispatchContext.Provider value={dispatch}>
      <NavSidebarStateContext.Provider value={state}>
        {children}
      </NavSidebarStateContext.Provider>
    </NavSidebarDispatchContext.Provider>
  );
};

const NavSidebarContent = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'>
>(({ className, children, ...props }, ref) => {
  const isOpen = useNavSidebarState();

  return (
    <div
      ref={ref}
      data-open={isOpen}
      className={cn(
        'transition-all duration-200 ease-out h-full flex flex-col border border-slate-500 text-slate-200 overflow-hidden data-[open=true]:w-64 data-[open=false]:w-14',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

const NavSidebarHeader = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'p-2 border-b border-slate-500 flex items-center',
        className
      )}
      {...props}
    />
  );
});

const NavSidebarMain = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'overflow-auto flex-1 p-2 flex flex-col items-start nav-sidebar-scroll',
        className
      )}
      {...props}
    />
  );
});

const NavSidebarLink = forwardRef<
  ElementRef<'a'>,
  ComponentPropsWithoutRef<'a'> & {
    label?: string;
    active?: boolean;
  }
>(({ label, active, className, children, ...props }, ref) => {
  const isOpen = useNavSidebarState();

  return (
    <a
      ref={ref}
      data-active={active}
      className={cn(
        'group/link cursor-pointer rounded-md px-1.75 py-1 my-1 w-full text-left flex space-x-2 items-center hover:bg-slate-800/50 flex-shrink-0 whitespace-nowrap data-[active=true]:bg-slate-800/70 transition-colors duration-200 ease',
        className
      )}
      {...props}
    >
      {children}
      <span
        data-open={isOpen}
        className={cn(
          'transition-all duration-200 data-[open=true]:visible data-[open=false]:invisible truncate'
        )}
      >
        {label}
      </span>
    </a>
  );
});

const NavSidebarButton = forwardRef<
  ElementRef<'button'>,
  ComponentPropsWithoutRef<'button'> & {
    label?: string;
    active?: boolean;
  }
>(({ label, active, className, children, ...props }, ref) => {
  const isOpen = useNavSidebarState();

  return (
    <button
      ref={ref}
      data-active={active}
      className={cn(
        'group/button cursor-pointer rounded-md px-1.75 py-1 space-x-2 my-1 w-full text-left flex items-center hover:bg-slate-800/50 flex-shrink-0 whitespace-nowrap data-[active=true]:bg-slate-800/70 transition-colors duration-200 ease',
        className
      )}
      {...props}
    >
      {children}
      <span
        data-open={isOpen}
        className={cn(
          'transition-all duration-200 data-[open=true]:visible data-[open=false]:invisible truncate'
        )}
      >
        {label}
      </span>
    </button>
  );
});

const NavSidebarFooter = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => {
  const isOpen = useNavSidebarState();

  return (
    <div
      ref={ref}
      data-open={isOpen}
      className={cn(
        'border-t border-slate-500 p-2 flex data-[open=true]:space-x-2 data-[open=false]:flex-col data-[open=true]:space-y-2',
        className
      )}
      {...props}
    />
  );
});

const NavSidebarTrigger = forwardRef<
  ElementRef<'button'>,
  ComponentPropsWithoutRef<'button'>
>(({ className, children, ...props }, ref) => {
  const setIsOpen = useNavSidebarDispatch();
  const isOpen = useNavSidebarState();

  return (
    <button
      ref={ref}
      onClick={() => setIsOpen(!isOpen)}
      className={cn(
        'px-1.5 py-1 flex space-x-2 items-center hover:bg-slate-800/50 rounded-md',
        className
      )}
      {...props}
    >
      <ChevronsRightIcon
        strokeWidth={1}
        data-open={isOpen}
        className={cn(
          'w-6 h-6 transition-transform duration-300 ease-in-out data-[open=true]:rotate-180'
        )}
      />
      {children}
    </button>
  );
});

const NavSidebarText = forwardRef<
  ElementRef<'span'>,
  ComponentPropsWithoutRef<'span'> & {
    hideOnCollapse?: boolean;
  }
>(({ hideOnCollapse, className, ...props }, ref) => {
  const isOpen = useNavSidebarState();

  return (
    <span
      ref={ref}
      data-open={isOpen}
      className={cn(
        'overflow-hidden text-left transition-all duration-200 whitespace-nowrap data-[open=true]:visible data-[open=false]:invisible data-[open=true]:w-full data-[open=false]:w-0',
        hideOnCollapse && !isOpen && 'hidden',
        className
      )}
      {...props}
    />
  );
});

const NavSidebarGroup = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'> & {
    label?: string;
  }
>(({ label, className, children, ...props }, ref) => {
  const isOpen = useNavSidebarState();

  return (
    <div
      ref={ref}
      className={cn('flex flex-col my-1 w-full', className)}
      {...props}
    >
      {label && isOpen ? (
        <h3 className="px-2 text-sm font-bold text-slate-500 mb-0.5 tracking-wide">
          {label}
        </h3>
      ) : null}
      {children}
    </div>
  );
});

const NavSidebarDropdown = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'> & {
    label: string;
    icon?: LucideIcon;
    expanded?: boolean;
  }
>(({ label, icon, expanded = false, className, children, ...props }, ref) => {
  const isOpen = useNavSidebarState();

  const [height, setHeight] = useState<'auto' | number>(expanded ? 'auto' : 0);
  const [isExpanded, setIsExpanded] = useState(expanded);

  const handleExpand = () => {
    setIsExpanded((v) => !v);
    setHeight((v) => (v === 'auto' ? 0 : 'auto'));
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="flex flex-col w-full group/root" data-open={isExpanded}>
      <button
        className="flex items-center px-2 py-1 rounded-md hover:bg-slate-800/50 group"
        onClick={handleExpand}
      >
        {icon ? (
          <>
            {createElement(icon, {
              className: 'w-6 h-6 block group-hover:hidden',
              stroke: '#7B7D82',
            })}
            <ChevronDown className="m-1 hidden group-hover:block w-4 h-4 group-data-[open=false]/root:-rotate-90 transition-transform duration-200 ease" />
          </>
        ) : (
          <ChevronDown className="w-4 h-4 group-data-[open=false]/root:-rotate-90 transition-transform duration-200 ease" />
        )}

        <span className="ml-2 truncate">{label}</span>
      </button>

      <AnimateHeight duration={200} height={height}>
        <div
          ref={ref}
          className={cn('flex flex-col w-full pl-4 space-y-1', className)}
          {...props}
        >
          {children}
        </div>
      </AnimateHeight>
    </div>
  );
});

const NavSidebarSeparator = ({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) => {
  return (
    <div className={cn('h-px bg-slate-500 w-full', className)} {...props} />
  );
};

export {
  NavSidebar,
  NavSidebarContent,
  NavSidebarHeader,
  NavSidebarMain,
  NavSidebarFooter,
  NavSidebarTrigger,
  NavSidebarLink,
  NavSidebarButton,
  NavSidebarText,
  NavSidebarGroup,
  NavSidebarDropdown,
  NavSidebarSeparator,
};
