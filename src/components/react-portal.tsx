import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: ReactNode;
  portalId?: string;
};

export function ReactPortal({ children, portalId }: Props) {
  return createPortal(
    children,
    document.getElementById(portalId ? portalId : 'example-root')!
  );
}
