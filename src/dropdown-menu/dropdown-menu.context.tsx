import { ReactNode, createContext, useContext, useReducer } from 'react';

export enum ActionTypes {
  Open,
  Close,
}

type DropdownMenuState = {
  open: boolean;
};

type DropdownMenuAction =
  | { type: ActionTypes.Open }
  | { type: ActionTypes.Close };

type DispatchedAction = (action: DropdownMenuAction) => void;

const reducer = (state: DropdownMenuState, action: DropdownMenuAction) => {
  switch (action.type) {
    case ActionTypes.Open:
      return { ...state, open: true };

    case ActionTypes.Close:
      return { ...state, open: false };

    default:
      throw new Error();
  }
};

const DropdownMenuStateContext = createContext<DropdownMenuState | null>(null);

const DropdownMenuDispatchContext = createContext<DispatchedAction | null>(
  null
);

export function useDropdownStore() {
  const context = useContext(DropdownMenuStateContext);

  if (!context) {
    throw new Error(
      'DropdownMenu compound components cannot be rendered outside the DropdownMenu component'
    );
  }

  return context;
}

export function useDropdownAction() {
  const context = useContext(DropdownMenuDispatchContext);

  if (!context) {
    throw new Error(
      'DropdownMenu compound components cannot be rendered outside the DropdownMenu component'
    );
  }

  return context;
}

export function DropdownMenuProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { open: false });

  return (
    <DropdownMenuStateContext.Provider value={state}>
      <DropdownMenuDispatchContext.Provider value={dispatch}>
        {children}
      </DropdownMenuDispatchContext.Provider>
    </DropdownMenuStateContext.Provider>
  );
}
