/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ComponentPropsWithoutRef,
  ElementType,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  Ref,
  forwardRef,
} from 'react';

type ReactTag = keyof JSX.IntrinsicElements | JSXElementConstructor<any>;

type ControledProps = 'as' | 'children' | 'className';

type HasProperty<T extends object, K extends PropertyKey> = T extends never
  ? never
  : K extends keyof T
  ? true
  : false;

type InternalProps<TTag extends ReactTag, TSlot> = {
  as?: TTag;
  children?: ReactNode | ((bag: TSlot) => ReactElement);
};

type CleanProps<
  TTag extends ReactTag,
  TOmittableProps extends PropertyKey = never
> = Omit<PropsOf<TTag>, TOmittableProps | ControledProps>;

type PropsOf<TTag extends ReactTag> = TTag extends ElementType
  ? Omit<ComponentPropsWithoutRef<TTag>, 'ref'>
  : never;

type ClassNameProp<
  TTag extends ReactTag,
  TSlot = object
> = true extends HasProperty<PropsOf<TTag>, 'className'>
  ? { className?: PropsOf<TTag>['className'] | ((bag: TSlot) => string) }
  : object;

export type Props<
  TTag extends ReactTag,
  TSlot = object,
  TOmittableProps extends PropertyKey = never,
  Extras = object
> = CleanProps<TTag, TOmittableProps | keyof Extras> &
  InternalProps<TTag, TSlot> &
  ClassNameProp<TTag, TSlot> &
  Extras;

// eslint-disable-next-line @typescript-eslint/ban-types
export type RefProp<T extends Function> = T extends (
  props: any,
  ref: Ref<infer RefType>
) => any
  ? { ref?: Ref<RefType> }
  : never;

export type HasDisplayName = {
  displayName: string;
};

export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

export function forwardRefWithAs<
  T extends { name: string; displayName?: string }
>(component: T): T & { displayName: string } {
  return Object.assign(forwardRef(component as any) as any, {
    displayName: component.displayName || component.name,
  });
}
