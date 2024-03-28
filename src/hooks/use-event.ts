import { useCallback, useLayoutEffect, useRef } from 'react';

export function useEvent<
  F extends (...args: unknown[]) => unknown,
  P extends unknown[] = Parameters<F>,
  R = ReturnType<F>
>(callback: (...args: P) => R) {
  const handler = useRef(callback);

  useLayoutEffect(() => {
    handler.current = callback;
  }, [callback]);

  return useCallback((...args: P) => handler.current(...args), [handler]);
}
