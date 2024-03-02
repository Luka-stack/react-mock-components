import { arrayIsLastIndex, arrayLast } from './utils';
import { Limit } from './limit';

export function ScrollContain(
  viewSize: number,
  contentSize: number,
  snapsAligned: number[],
  pixelTolerance: number
) {
  const scrollBounds = Limit(-contentSize + viewSize, 0);
  const snapsBounded = measureBounded();
  const scrollContainLimit = findScrollContainLimit();
  const snapsContained = measureContained();

  function measureContained() {
    if (contentSize <= viewSize + pixelTolerance) return [scrollBounds.max];
    return snapsBounded.slice(scrollContainLimit.min, scrollContainLimit.max);
  }

  function findScrollContainLimit() {
    const startSnap = snapsBounded[0];
    const endSnap = arrayLast(snapsBounded);
    const min = snapsBounded.lastIndexOf(startSnap);
    const max = snapsBounded.indexOf(endSnap) + 1;
    return Limit(min, max);
  }

  function measureBounded() {
    const { min, max } = scrollBounds;

    return snapsAligned
      .map((snapAligned, index) => {
        const snap = scrollBounds.constrain(snapAligned);

        if (index === 0) {
          return max;
        }

        if (arrayIsLastIndex(snapsAligned, index)) {
          return min;
        }

        if (checkPixelTolerance(min, snap)) {
          return min;
        }

        if (checkPixelTolerance(max, snap)) {
          return max;
        }

        return snap;
      })
      .map((bound) => parseFloat(bound.toFixed(2)));
  }

  function checkPixelTolerance(bound: number, snap: number) {
    return Math.abs(bound - snap) < 1;
  }

  return {
    snapsContained,
  };
}
