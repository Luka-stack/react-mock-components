import { arrayLast, arrayLastIndex } from './utils';
import { CounterType, Counter } from './counter';
import { NodeRect } from './node-rect';
import { ScrollContain } from './scroll-contain';
import { ScrollSnaps } from './scroll-snaps';
import { ScrollTo } from './scroll-to';
import { SlidesSizes } from './slides-sizes';
import { Translate } from './translate';

export type EngineType = {
  index: CounterType;
  scrollTo: (n: number, direction: number) => void;
  canScrollNext: () => boolean;
  canScrollPrev: () => boolean;
};

export function Engine(
  container: HTMLElement,
  slides: HTMLElement[]
): EngineType {
  const pixelTolerance = 2;
  const nodeRects = NodeRect();
  const containerRect = nodeRects.measure(container);
  const slideRects = slides.map(nodeRects.measure);

  const { slideSizesWithGaps } = SlidesSizes(containerRect, slideRects);

  const { snaps, snapsAligned } = ScrollSnaps(containerRect, slideRects);

  const contentSize = -arrayLast(snaps) + arrayLast(slideSizesWithGaps);

  const { snapsContained } = ScrollContain(
    containerRect.width,
    contentSize,
    snapsAligned,
    pixelTolerance
  );

  const index = Counter(arrayLastIndex(snapsContained), 0);
  const translate = Translate(container);
  const { scrollTo } = ScrollTo(snapsContained, index, translate);

  function canScrollNext() {
    const next = index.add(1).get();
    return index.get() !== next;
  }

  function canScrollPrev() {
    const prev = index.add(-1).get();
    return index.get() !== prev;
  }

  return {
    index,
    scrollTo,
    canScrollNext,
    canScrollPrev,
  };
}
