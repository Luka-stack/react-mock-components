import { MutableRefObject, useEffect, useRef } from 'react';

export function useCombinedRefs<T>(
  ...refs: (MutableRefObject<T> | ((instance: T | null) => void) | null)[]
): MutableRefObject<T | null> {
  const targetRef = useRef<T>(null);

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current as T;
      }
    });
  }, [refs]);

  return targetRef;
}
