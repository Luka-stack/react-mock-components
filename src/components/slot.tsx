import {
  Children,
  cloneElement,
  isValidElement,
  ButtonHTMLAttributes,
} from 'react';
import { cn } from '../lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function Slot({ children, ...props }: ButtonProps) {
  if (isValidElement(children)) {
    return cloneElement(children, {
      ...props,
      ...children.props,
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
