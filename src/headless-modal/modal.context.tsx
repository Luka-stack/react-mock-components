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

type ModalState = {
  open: boolean;
};

type ModalAction = { type: ActionTypes.Open } | { type: ActionTypes.Close };

type DispatchedAction = (action: ModalAction) => void;

const reducer = (state: ModalState, action: ModalAction) => {
  switch (action.type) {
    case ActionTypes.Open:
      return { ...state, open: true };

    case ActionTypes.Close:
      return { ...state, open: false };

    default:
      throw new Error('Invalid action type');
  }
};

const ModalStateContext = createContext<ModalState | null>(null);

const ModalDispatchContext = createContext<DispatchedAction | null>(null);

export function useModalStore() {
  const context = useContext(ModalStateContext);

  if (!context) {
    throw new Error('useModalStore must be used within a ModalProvider');
  }

  return context;
}

export function useModalDispatch() {
  const context = useContext(ModalDispatchContext);

  if (!context) {
    throw new Error('useModalDispatch must be used within a ModalProvider');
  }

  return context;
}

export function ModalProvider({
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
    (action: ModalAction) => {
      if (onOpenChange) {
        onOpenChange(action.type === ActionTypes.Open);
      } else {
        defaultDispatch(action);
      }
    },
    [defaultDispatch, onOpenChange]
  );

  return (
    <ModalDispatchContext.Provider value={dispatch}>
      <ModalStateContext.Provider value={state}>
        {children}
      </ModalStateContext.Provider>
    </ModalDispatchContext.Provider>
  );
}
