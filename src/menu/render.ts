/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Fragment,
  ReactElement,
  cloneElement,
  createElement,
  isValidElement,
  type ElementType,
} from 'react';

import { Props } from './types';

export function render<TTag extends ElementType, TSlot>(
  externalProps: Props<TTag, TSlot, any>,
  internalProps: Props<any, any>,
  slot: TSlot = {} as TSlot,
  tag: ElementType
) {
  const props = mergeProps(externalProps, internalProps) as Props<
    TTag,
    TSlot
  > & { ref?: unknown };

  const { as: Component = tag, children, ...restProps } = props;

  if (
    'className' in restProps &&
    restProps.className &&
    typeof restProps.className === 'function'
  ) {
    restProps.className = restProps.className(slot);
  }

  const resolvedChildren = (
    typeof children === 'function' ? children(slot) : children
  ) as ReactElement | ReactElement[];

  if (Component === Fragment) {
    if (hasValidProps(restProps)) {
      if (
        !isValidElement(resolvedChildren) ||
        hasMoreThanOneElement(resolvedChildren)
      ) {
        if (hasValidProps(restProps)) {
          throw new Error('Passing props on "Fragment" is not supported.');
        }
      } else {
        const mergedProps = mergeProps(
          resolvedChildren.props as any,
          compact(restProps)
        );

        return cloneElement(resolvedChildren, Object.assign({}, mergedProps));
      }
    }
  }

  return createElement(
    Component,
    Object.assign({}, restProps),
    resolvedChildren
  );
}

export function mergeProps(...propsList: Props<any, any>[]) {
  if (propsList.length === 0) return {};
  if (propsList.length === 1) return propsList[0];

  const mergedProps: Props<any, any> = {};
  const eventHandlers: Record<
    string,
    ((...args: any[]) => void | undefined)[]
  > = {};

  for (const props of propsList) {
    for (const prop in props) {
      if (prop.startsWith('on') && typeof props[prop] === 'function') {
        eventHandlers[prop] ??= [];
        eventHandlers[prop].push(props[prop]);
      } else {
        mergedProps[prop] = props[prop];
      }
    }
  }

  if (mergedProps.disabled || mergedProps['aria-disabled']) {
    for (const eventName in eventHandlers) {
      if (/^(on(?:Click|Mouse|Key)(?:Down|Up|Press)?)/.test(eventName)) {
        eventHandlers[eventName] = [(e: any) => e?.preventDefault?.()];
      }
    }
  }

  for (const eventName in eventHandlers) {
    Object.assign(mergedProps, {
      [eventName](event: { nativeEvent?: Event }, ...args: any[]) {
        const handlers = eventHandlers[eventName];

        for (const handler of handlers) {
          handler(event, ...args);
        }
      },
    });
  }

  return mergedProps;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
function omit<T extends Record<any, any>>(
  object: T,
  keysToOmit: string[] = []
) {
  const clone = Object.assign({}, object);
  for (const key of keysToOmit) {
    delete clone[key];
  }

  return clone;
}

function compact<T extends Record<any, unknown>>(object: T) {
  const clone = Object.assign({}, object);
  for (const key in clone) {
    if (clone[key] === undefined || clone[key] === null) {
      delete clone[key];
    }
  }

  return clone;
}

function hasMoreThanOneElement(children: ReactElement | ReactElement[]) {
  return Array.isArray(children) && children.length > 1;
}

function hasValidProps<TTag extends ElementType, TSlot>(
  props: Props<TTag, TSlot> & { ref?: unknown }
) {
  const compactedProps = compact(props);
  return Object.keys(compactedProps).length > 0;
}
