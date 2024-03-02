export function arrayLastIndex<Type>(array: Type[]): number {
  return Math.max(0, array.length - 1);
}

export function arrayIsLastIndex<Type>(array: Type[], index: number): boolean {
  return index === arrayLastIndex(array);
}

export function arrayLast<Type>(array: Type[]): Type {
  return array[arrayLastIndex(array)];
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}
