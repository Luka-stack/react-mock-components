import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { usePortalTarget } from '../hooks/use-portal-target';

type Props = {
  children: ReactNode;
  rootId?: string;
};

export function ReactPortal({ children, rootId }: Props) {
  const target = usePortalTarget(rootId);

  return createPortal(children, target);
}
