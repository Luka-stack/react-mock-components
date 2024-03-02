import { NodeRectType } from './node-rect';

export function ScrollSnaps(
  containerRect: NodeRectType,
  slideRects: NodeRectType[]
) {
  const alignments = measureSizes();
  const snaps = measureUnaligned();
  const snapsAligned = measureAligned();

  function measureSizes() {
    return slideRects
      .map((rect) => rect.right - rect.left)
      .map(Math.abs)
      .map((size) => (containerRect.width - size) / 2);
  }

  function measureUnaligned() {
    return slideRects
      .map((rect) => containerRect.left - rect.left)
      .map((snap) => -Math.abs(snap));
  }

  function measureAligned() {
    return snaps.map((snap, index) => snap + alignments[index]);
  }

  return {
    snaps,
    snapsAligned,
  };
}
