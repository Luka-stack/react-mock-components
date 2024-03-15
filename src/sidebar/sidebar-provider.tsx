import {
  ComponentPropsWithRef,
  createContext,
  useContext,
  useReducer,
} from 'react';

export enum ActionTypes {
  Trigger, // 0
  Close, // 1
  TriggerClose, // 2
  Register, // 3
  Deregister, // 4
  RegisterRoot, // 5
}

export type MediaScreen = 'sm' | 'md' | 'lg' | 'xl' | number;

const mediaScreenToPx = (mediaScreen?: MediaScreen) => {
  if (!mediaScreen) {
    return 768;
  }

  if (typeof mediaScreen === 'number') {
    return mediaScreen;
  }

  switch (mediaScreen) {
    case 'sm':
      return 640;
    case 'md':
      return 768;
    case 'lg':
      return 1024;
    case 'xl':
      return 1280;
  }
};

type SidebarState = {
  open: boolean;
  visibleContentId: string | null;
  contents: Map<string, ComponentPropsWithRef<'div'>>;
  mediaScreen: number;
  root: HTMLDivElement | null;
};

type SidebarAction =
  | { type: ActionTypes.Trigger; contentId: string }
  | { type: ActionTypes.Close }
  | {
      type: ActionTypes.Register;
      contentId: string;
      props: ComponentPropsWithRef<'div'>;
    }
  | { type: ActionTypes.Deregister; contentId: string }
  | { type: ActionTypes.TriggerClose }
  | { type: ActionTypes.RegisterRoot; root: HTMLDivElement | null };

type DispatchAction = (action: SidebarAction) => void;

const reducer = (state: SidebarState, action: SidebarAction): SidebarState => {
  switch (action.type) {
    case ActionTypes.Trigger:
      if (state.open && state.visibleContentId === action.contentId) {
        return {
          ...state,
          open: false,
          visibleContentId: null,
        };
      }

      return {
        ...state,
        open: true,
        visibleContentId: action.contentId,
      };

    case ActionTypes.Close:
      return {
        ...state,
        open: false,
        visibleContentId: null,
      };

    case ActionTypes.TriggerClose:
      return {
        ...state,
        open: false,
      };

    case ActionTypes.Register:
      return {
        ...state,
        contents: new Map(state.contents).set(action.contentId, action.props),
      };

    case ActionTypes.RegisterRoot:
      return {
        ...state,
        root: action.root,
      };

    case ActionTypes.Deregister: {
      const newContents = new Map(state.contents);
      newContents.delete(action.contentId);

      if (state.open && state.visibleContentId === action.contentId) {
        return {
          ...state,
          open: false,
          visibleContentId: null,
          contents: newContents,
        };
      }

      return {
        ...state,
        contents: newContents,
      };
    }

    default:
      throw new Error('Invalid action');
  }
};

const SidebarStateContext = createContext<SidebarState | null>(null);
const SidebarDispatchContext = createContext<DispatchAction | null>(null);

export function useSidebarState() {
  const context = useContext(SidebarStateContext);

  if (!context) {
    throw new Error('useSidebarState must be used within a SidebarProvider');
  }

  return context;
}

export function useSidebarDispatch() {
  const context = useContext(SidebarDispatchContext);

  if (!context) {
    throw new Error('useSidebarDispatch must be used within a SidebarProvider');
  }

  return context;
}

export function SidebarProvider({
  children,
  mediaScreen,
}: {
  children: React.ReactNode;
  mediaScreen?: MediaScreen;
}) {
  const [state, defaultDispatch] = useReducer(reducer, {
    open: false,
    visibleContentId: null,
    contents: new Map(),
    mediaScreen: mediaScreenToPx(mediaScreen),
    root: null,
  });

  return (
    <SidebarDispatchContext.Provider value={defaultDispatch}>
      <SidebarStateContext.Provider value={state}>
        {children}
      </SidebarStateContext.Provider>
    </SidebarDispatchContext.Provider>
  );
}
