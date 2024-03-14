import { useCallback, useRef, useState } from 'react';

export function useDebounce<TData>(
  initialState: TData | (() => TData),
  wait = 100
) {
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const [state, setState] = useState(initialState);

  const debouncer = useCallback(
    (newState: TData) => {
      timeout.current && clearTimeout(timeout.current);

      timeout.current = setTimeout(() => {
        timeout.current = void 0;
        setState(newState);
      }, wait);
    },
    [wait]
  );

  return [state, debouncer] as const;
}
