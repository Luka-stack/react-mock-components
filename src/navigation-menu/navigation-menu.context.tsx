import { ReactNode, createContext, useContext, useReducer } from 'react';

export enum ActionTypes {
  Close,
  Trigger,
  Register,
}

type NavigationState = {
  open: boolean;
  contentId: string | null;
  contents: Map<string, ReactNode>;
};

type NavigationAction =
  | { type: ActionTypes.Trigger; contentId: string }
  | { type: ActionTypes.Register; id: string; node: ReactNode }
  | { type: ActionTypes.Close };

type DispatchedAction = (action: NavigationAction) => void;

const reducer = (state: NavigationState, action: NavigationAction) => {
  switch (action.type) {
    case ActionTypes.Trigger:
      if (state.open && state.contentId === action.contentId) {
        return {
          ...state,
          open: false,
          contentId: null,
        };
      }

      return {
        ...state,
        open: true,
        contentId: action.contentId,
      };

    case ActionTypes.Register:
      return {
        ...state,
        contents: new Map(state.contents).set(action.id, action.node),
      };

    case ActionTypes.Close:
      return {
        ...state,
        open: false,
        contentId: null,
      };

    default:
      throw new Error('Invalid action type');
  }
};

const NavigationStateContext = createContext<NavigationState | null>(null);

const NavigationDispatchContext = createContext<DispatchedAction | null>(null);

export function useNavigationStore() {
  const context = useContext(NavigationStateContext);

  if (!context) {
    throw new Error(
      'useNavigationStore must be used within a NavigationProvider'
    );
  }

  return context;
}

export function useNavigationDispatch() {
  const context = useContext(NavigationDispatchContext);

  if (!context) {
    throw new Error(
      'useNavigationDispatch must be used within a NavigationProvider'
    );
  }

  return context;
}

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [defaultState, defaultDispatch] = useReducer(reducer, {
    open: false,
    contentId: null,
    contents: new Map(),
  });

  return (
    <NavigationDispatchContext.Provider value={defaultDispatch}>
      <NavigationStateContext.Provider value={defaultState}>
        {children}
      </NavigationStateContext.Provider>
    </NavigationDispatchContext.Provider>
  );
}
