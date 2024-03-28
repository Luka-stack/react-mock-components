import { useHover } from '@react-aria/interactions';
import { CSSTransition } from 'react-transition-group';
import {
  ElementType,
  Fragment,
  Ref,
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
} from 'react';

import { cn } from '../lib/utils';
import { useEvent } from '../hooks/use-event';
import { ReactPortal } from '../components/react-portal';
import { mergeProps, render } from './render';
import { HasDisplayName, Props, RefProp, forwardRefWithAs } from './types';
import OutsideClickHandler from 'react-outside-click-handler';

const ContentTopMargin = 4;

const makeMenuId = (uuid: string, part: string) => `menu-${part}-${uuid}`;

const useMenuState = (uuid: string, isOpen: boolean) =>
  useState<{ uuid: string; isOpen: boolean }>({ uuid, isOpen });

const MenuContext = createContext<ReturnType<typeof useMenuState> | null>(null);

export function useOpenClose() {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error('useOpenClose must be used within a MenuProvider');
  }

  return context;
}

// Menu
const DEFAULT_MENU_TAG = Fragment;

type MenuRenderArgs = {
  isOpen: boolean;
  toggle: () => void;
};

export type MenuProps<TTag extends ElementType = typeof DEFAULT_MENU_TAG> =
  Props<TTag, MenuRenderArgs>;

function MenuRenderer<TTag extends ElementType = typeof DEFAULT_MENU_TAG>(
  props: MenuProps<TTag>,
  ref: Ref<HTMLElement>
) {
  const uuid = useId();
  const state = useMenuState(uuid, false);

  const slot = useMemo(
    () =>
      ({
        isOpen: state[0].isOpen,
        toggle: () => state[1]((prev) => ({ ...prev, isOpen: !prev.isOpen })),
      } satisfies MenuRenderArgs),
    [state]
  );

  const internalProps = {
    ref,
  };

  return (
    <MenuContext.Provider value={state}>
      <OutsideClickHandler
        onOutsideClick={() => {
          state[1]((prev) => ({ ...prev, isOpen: false }));
        }}
      >
        {render(props, internalProps, slot, DEFAULT_MENU_TAG)}
      </OutsideClickHandler>
    </MenuContext.Provider>
  );
}

// Menu.Item
const DEFAULT_ITEM_TAG = Fragment;

type MenuItemRenderArgs = {
  hover: boolean;
  disabled: boolean;
};

type MenuItemControlledProps = 'aria-disabled';

type MenuItemProps<TTag extends ElementType = typeof DEFAULT_ITEM_TAG> = Props<
  TTag,
  MenuItemRenderArgs,
  MenuItemControlledProps,
  {
    disabled?: boolean;
  }
>;

function MenuItemRenderer<TTag extends ElementType = typeof DEFAULT_ITEM_TAG>(
  props: MenuItemProps<TTag>,
  ref: Ref<HTMLElement>
) {
  const [{ uuid }] = useOpenClose();
  const {
    id = `${makeMenuId(uuid, 'item')}`,
    disabled = false,
    ...restProps
  } = props;

  const { isHovered: hover, hoverProps } = useHover({ isDisabled: disabled });

  const slot = useMemo(
    () => ({ hover, disabled } satisfies MenuItemRenderArgs),
    [disabled, hover]
  );

  const internalProps = mergeProps(
    {
      id,
      ref,
      'aria-disabled': disabled === true ? true : undefined,
    },
    hoverProps
  );

  return render(restProps, internalProps, slot, DEFAULT_ITEM_TAG);
}

// Menu.Trigger
const DEFAULT_TRIGGER_TAG = 'button' as const;

type MenuTriggerRenderArgs = {
  hover: boolean;
  disabled: boolean;
  isOpen: boolean;
};

type MenuTriggerControlledProps = 'aria-disabled';

type MenuTriggerProps<TTag extends ElementType = typeof DEFAULT_TRIGGER_TAG> =
  Props<
    TTag,
    MenuTriggerRenderArgs,
    MenuTriggerControlledProps,
    { disabled?: boolean }
  >;

function MenuTriggerRenderer<
  TTag extends ElementType = typeof DEFAULT_TRIGGER_TAG
>(props: MenuTriggerProps<TTag>, ref: Ref<HTMLElement>) {
  const [state, setState] = useOpenClose();
  const {
    id = `${makeMenuId(state.uuid, 'trigger')}`,
    disabled = false,
    ...restProps
  } = props;

  const handleClick = useEvent(() => {
    if (disabled) return;
    setState((prev) => {
      return { ...prev, isOpen: !prev.isOpen };
    });
  });

  const { isHovered: hover, hoverProps } = useHover({ isDisabled: disabled });

  const slot = useMemo(
    () =>
      ({
        hover,
        isOpen: state.isOpen,
        disabled,
      } satisfies MenuTriggerRenderArgs),
    [hover, state.isOpen, disabled]
  );

  const internalProps = mergeProps(
    {
      id,
      ref,
      'aria-disabled': disabled === true ? true : undefined,
      onClick: handleClick,
    },
    hoverProps
  );

  return render(restProps, internalProps, slot, DEFAULT_TRIGGER_TAG);
}

const DEFAULT_CONTENT_TAG = 'div' as const;

type MenuContentRenderArgs = {
  open: boolean;
};

type MenuContentProps<TTag extends ElementType = typeof DEFAULT_CONTENT_TAG> =
  Props<TTag, MenuContentRenderArgs>;

function MenuContentRenderer<
  TTag extends ElementType = typeof DEFAULT_CONTENT_TAG
>(props: MenuContentProps<TTag>, ref: Ref<HTMLElement>) {
  const [{ isOpen, uuid }] = useOpenClose();
  const { id = `${makeMenuId(uuid, 'content')}`, ...restProps } = props;
  const [position, setPosition] = useState({ left: 0, top: 0 });

  const slot = useMemo(
    () => ({ open: isOpen } satisfies MenuContentRenderArgs),
    [isOpen]
  );

  const internalProps = {
    id,
    ref,
  };

  const handlePositionChange = useCallback(
    (node: HTMLElement) => {
      const trigger = document.getElementById(makeMenuId(uuid, 'trigger'));
      if (!trigger) return;

      const triggerRect = trigger.getBoundingClientRect();
      const nodeRect = node.getBoundingClientRect();

      let left = 0;

      if (triggerRect.right >= nodeRect.width) {
        left = triggerRect.left + trigger.offsetWidth - node.offsetWidth;
      } else if (window.innerWidth - triggerRect.left >= nodeRect.width) {
        left = trigger.offsetLeft;
      } else {
        left = triggerRect.left + trigger.offsetWidth - node.offsetWidth;
      }

      const canPutBottom =
        window.innerHeight - trigger.getBoundingClientRect().bottom >=
        node.offsetHeight + ContentTopMargin;
      const canPutTop =
        trigger.getBoundingClientRect().top >=
        node.offsetHeight + ContentTopMargin;

      let top = 0;

      if (canPutBottom || !canPutTop) {
        top = trigger.getBoundingClientRect().bottom + ContentTopMargin;
      } else {
        top =
          trigger.getBoundingClientRect().top -
          node.offsetHeight -
          ContentTopMargin;
      }

      setPosition({ top, left });
    },
    [uuid]
  );

  return (
    <ReactPortal>
      <CSSTransition
        in={isOpen}
        timeout={200}
        onEnter={handlePositionChange}
        classNames={'menu'}
        unmountOnExit
      >
        <div style={position} className={cn('absolute')}>
          {render(restProps, internalProps, slot, DEFAULT_CONTENT_TAG)}
        </div>
      </CSSTransition>
    </ReactPortal>
  );
}

// Export
interface ComponentMenu extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_MENU_TAG>(
    props: MenuProps<TTag> & RefProp<typeof MenuRenderer>
  ): JSX.Element;
}

interface ComponentMenuItem extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_ITEM_TAG>(
    props: MenuItemProps<TTag> & RefProp<typeof MenuItemRenderer>
  ): JSX.Element;
}

interface ComponentMenuTrigger extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_TRIGGER_TAG>(
    props: MenuTriggerProps<TTag> & RefProp<typeof MenuTriggerRenderer>
  ): JSX.Element;
}

interface ComponentMenuContent extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_CONTENT_TAG>(
    props: MenuContentProps<TTag> & RefProp<typeof MenuContentRenderer>
  ): JSX.Element;
}

const MenuRoot = forwardRefWithAs(MenuRenderer) as unknown as ComponentMenu;
const MenuContent = forwardRefWithAs(
  MenuContentRenderer
) as unknown as ComponentMenuContent;
const MenuItem = forwardRefWithAs(
  MenuItemRenderer
) as unknown as ComponentMenuItem;
const MenuTrigger = forwardRefWithAs(
  MenuTriggerRenderer
) as unknown as ComponentMenuTrigger;

export const Menu = Object.assign(MenuRoot, {
  Content: MenuContent,
  Item: MenuItem,
  Trigger: MenuTrigger,
});
