import { Limit } from './limit';

export type CounterType = ReturnType<typeof Counter>;

export function Counter(max: number, start: number) {
  const { constrain } = Limit(0, max);
  let counter = withinLimit(start);

  function withinLimit(n: number) {
    return constrain(n);
  }

  function clone() {
    return Counter(max, counter);
  }

  function get() {
    return counter;
  }

  function set(n: number) {
    counter = withinLimit(n);
    return self;
  }

  function add(n: number) {
    return clone().set(counter + n);
  }

  const self = {
    get,
    set,
    add,
    clone,
  };

  return self;
}
