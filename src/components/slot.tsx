import {
  Children,
  HTMLAttributes,
  ReactNode,
  cloneElement,
  isValidElement,
} from 'react';
import { cn } from '../lib/utils';

export function Slot({
  children,
  onClick,
  ...props
}: HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  onClick?: () => void;
}) {
  if (isValidElement(children)) {
    return cloneElement(children, {
      ...props,
      ...children.props,
      onClick: (event: React.MouseEvent) => {
        onClick && onClick();
        children.props.onClick && children.props.onClick(event);
      },
      style: {
        ...props.style,
        ...children.props.style,
      },
      className: cn(props.className, children.props.className),
    });
  }

  if (Children.count(children) > 0) {
    Children.only(null);
  }

  return null;
}
