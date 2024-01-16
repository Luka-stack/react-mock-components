import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

export function ReactPortal({ children }: { children: ReactNode }) {
  return createPortal(children, document.getElementById('example-root')!);
}
