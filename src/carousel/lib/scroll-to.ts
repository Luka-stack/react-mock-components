import { CounterType } from './counter';
import { TranslateType } from './translate';

export function ScrollTo(
  snaps: number[],
  indexCurrent: CounterType,
  translate: TranslateType
) {
  function scrollTo(n: number) {
    const targetIndex = indexCurrent.clone().set(n);
    const targetSnap = snaps[targetIndex.get()];

    indexCurrent.set(targetIndex.get());
    translate.to(targetSnap);
  }

  return {
    scrollTo,
  };
}
