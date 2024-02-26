import { v4 as uuidv4 } from 'uuid';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react';

export enum ActionTypes {
  Enter,
  Close,
}

type TooltipState = {
  open: boolean;
  baseId: string;
};

type TooltipAction = { type: ActionTypes.Close } | { type: ActionTypes.Enter };

type DispatchedAction = (action: TooltipAction) => void;

const reducer = (state: TooltipState, action: TooltipAction) => {
  switch (action.type) {
    case ActionTypes.Close:
      return { ...state, open: false };

    case ActionTypes.Enter:
      return { ...state, open: true };

    default:
      return state;
  }
};

const TooltipStateContext = createContext<TooltipState | null>(null);

const TooltipDispatchContext = createContext<DispatchedAction | null>(null);

export function useTooltipStore() {
  const context = useContext(TooltipStateContext);

  if (!context) {
    throw new Error('useTooltipStore must be used within a TooltipProvider');
  }

  return context;
}

export function useTooltipDispatch() {
  const context = useContext(TooltipDispatchContext);

  if (!context) {
    throw new Error(
      'useNavigationDispatch must be used within a NavigationProvider'
    );
  }

  return context;
}

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  const closeTimeRef = useRef(0);
  const delayTimeRef = useRef(0);

  const [state, defaultDispatch] = useReducer(reducer, {
    open: false,
    baseId: uuidv4(),
  });

  const dispatch = useCallback(
    (action: TooltipAction) => {
      switch (action.type) {
        case ActionTypes.Enter:
          window.clearTimeout(closeTimeRef.current);

          delayTimeRef.current = window.setTimeout(
            () =>
              defaultDispatch({
                type: ActionTypes.Enter,
              }),
            500
          );

          break;

        case ActionTypes.Close:
          window.clearTimeout(closeTimeRef.current);
          window.clearTimeout(delayTimeRef.current);

          closeTimeRef.current = window.setTimeout(() => {
            defaultDispatch({ type: ActionTypes.Close });
          }, 100);
          break;

        default:
          defaultDispatch(action);
      }
    },
    [defaultDispatch]
  );

  useEffect(() => {
    return () => {
      window.clearTimeout(closeTimeRef.current);
      window.clearTimeout(delayTimeRef.current);
    };
  }, []);

  return (
    <TooltipDispatchContext.Provider value={dispatch}>
      <TooltipStateContext.Provider value={state}>
        {children}
      </TooltipStateContext.Provider>
    </TooltipDispatchContext.Provider>
  );
}
