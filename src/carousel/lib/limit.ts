export type LimitType = {
  min: number;
  max: number;
  constrain: (n: number) => number;
};

export function Limit(min: number, max: number): LimitType {
  function reachedMin(n: number): boolean {
    return n < min;
  }

  function reachedMax(n: number): boolean {
    return n > max;
  }

  function reachedAny(n: number): boolean {
    return reachedMin(n) || reachedMax(n);
  }

  function constrain(n: number): number {
    if (!reachedAny(n)) {
      return n;
    }

    return reachedMin(n) ? min : max;
  }

  return {
    min,
    max,
    constrain,
  };
}
