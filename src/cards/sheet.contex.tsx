import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';

export enum ActionTypes {
  Open,
  Close,
}

type SheetState = {
  open: boolean;
};

type SheetAction = { type: ActionTypes.Open } | { type: ActionTypes.Close };

type DispatchedAction = (action: SheetAction) => void;

const reducer = (state: SheetState, action: SheetAction) => {
  switch (action.type) {
    case ActionTypes.Open:
      return { ...state, open: true };

    case ActionTypes.Close:
      return { ...state, open: false };

    default:
      throw new Error('Invalid action type');
  }
};

const SheetStateContext = createContext<SheetState | null>(null);

const SheetDispatchContext = createContext<DispatchedAction | null>(null);

export function useSheetStore() {
  const context = useContext(SheetStateContext);

  if (!context) {
    throw new Error('useSheetStore must be used within a SheetProvider');
  }

  return context;
}

export function useSheetDispatch() {
  const context = useContext(SheetDispatchContext);

  if (!context) {
    throw new Error('useSheetDispatch must be used within a SheetProvider');
  }

  return context;
}

export function SheetProvider({
  children,
  open,
  onOpenChange,
}: {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (state: boolean) => void;
}) {
  const [defaultState, defaultDispatch] = useReducer(reducer, { open: false });

  const state = useMemo(() => {
    if (open !== undefined) {
      return { open };
    } else {
      return defaultState;
    }
  }, [open, defaultState]);

  const dispatch = useCallback(
    (action: SheetAction) => {
      if (onOpenChange) {
        onOpenChange(action.type === ActionTypes.Open);
      } else {
        defaultDispatch(action);
      }
    },
    [defaultDispatch, onOpenChange]
  );

  return (
    <SheetDispatchContext.Provider value={dispatch}>
      <SheetStateContext.Provider value={state}>
        {children}
      </SheetStateContext.Provider>
    </SheetDispatchContext.Provider>
  );
}
