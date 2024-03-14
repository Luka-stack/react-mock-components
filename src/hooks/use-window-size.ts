import { useEffect } from 'react';
import { useDebounce } from './use-debounce';

export function useWindowSize(): readonly [number, number] {
  const [size, setSize] = useDebounce<[number, number]>([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleResize = () => setSize([window.innerWidth, window.innerHeight]);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [setSize]);

  return size;
}
