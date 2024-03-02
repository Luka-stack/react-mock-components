import { arrayIsLastIndex } from './utils';
import { NodeRectType } from './node-rect';

export type SlidesSizesType = {
  slideSizes: number[];
  slideSizesWithGaps: number[];
};

export function SlidesSizes(
  containerRect: NodeRectType,
  slideRects: NodeRectType[]
): SlidesSizesType {
  const startGap = measureStartGap();
  const endGap = 0;
  const slideSizes = slideRects.map((rect) => rect.width);
  const slideSizesWithGaps = measureWithGaps();

  function measureStartGap() {
    return Math.abs(containerRect.left - slideRects[0].left);
  }

  function measureWithGaps() {
    return slideRects.map((rect, index, rects) => {
      const isFirst = index === 0;
      const isLast = arrayIsLastIndex(rects, index);

      if (isFirst) {
        return slideSizes[index] + startGap;
      }

      if (isLast) {
        return slideSizes[index] + endGap;
      }

      return rects[index + 1].left - rect.left;
    });
  }

  return {
    slideSizes,
    slideSizesWithGaps,
  };
}
