import { useEffect } from 'react';
import { ActionTypes } from './sidebar-provider';

export function useSidebarOutsideClick(
  root: HTMLDivElement | null,
  open: boolean,
  floating: boolean,
  action: (action: { type: ActionTypes.TriggerClose }) => void
) {
  useEffect(() => {
    if (root && open && floating) {
      const handleClick = (event: MouseEvent) => {
        if (root && !root.contains(event.target as Node) && floating) {
          action({ type: ActionTypes.TriggerClose });
        }
      };

      document.addEventListener('click', handleClick);

      return () => {
        document.removeEventListener('click', handleClick);
      };
    }
  }, [floating, open, root, action]);
}
