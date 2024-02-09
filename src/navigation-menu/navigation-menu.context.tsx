import {
  ComponentPropsWithRef,
  ReactNode,
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
  Trigger,
  Register,
  Deregister,
}

type NavigationState = {
  open: boolean;
  contentId: string | null;
  contents: Map<string, ComponentPropsWithRef<'div'>>;
};

type NavigationAction =
  | { type: ActionTypes.Trigger; contentId: string }
  | {
      type: ActionTypes.Register;
      id: string;
      node: ComponentPropsWithRef<'div'>;
    }
  | { type: ActionTypes.Deregister; id: string }
  | { type: ActionTypes.Close }
  | { type: ActionTypes.Enter };

type DispatchedAction = (action: NavigationAction) => void;

const reducer = (state: NavigationState, action: NavigationAction) => {
  switch (action.type) {
    case ActionTypes.Deregister:
      if (state.open && state.contentId === action.id) {
        return {
          ...state,
          open: false,
          contentId: null,
          contents: new Map(
            [...state.contents].filter(([key]) => key !== action.id)
          ),
        };
      }

      return {
        ...state,
        contents: new Map(
          [...state.contents].filter(([key]) => key !== action.id)
        ),
      };

    case ActionTypes.Trigger:
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
  const closeTimeRef = useRef(0);

  const [defaultState, defaultDispatch] = useReducer(reducer, {
    open: false,
    contentId: null,
    contents: new Map(),
  });

  const dispatch = useCallback(
    (action: NavigationAction) => {
      switch (action.type) {
        case ActionTypes.Trigger:
          window.clearTimeout(closeTimeRef.current);
          defaultDispatch({
            type: ActionTypes.Trigger,
            contentId: action.contentId,
          });
          break;

        case ActionTypes.Close:
          window.clearTimeout(closeTimeRef.current);
          closeTimeRef.current = window.setTimeout(() => {
            defaultDispatch({ type: ActionTypes.Close });
          }, 100);
          break;

        case ActionTypes.Enter:
          window.clearTimeout(closeTimeRef.current);
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
    };
  }, []);

  return (
    <NavigationDispatchContext.Provider value={dispatch}>
      <NavigationStateContext.Provider value={defaultState}>
        {children}
      </NavigationStateContext.Provider>
    </NavigationDispatchContext.Provider>
  );
}
