import { useCallback, useEffect, useRef, useState } from 'react';

import { Engine, EngineType } from './lib/engine';

type ViewportRefType = (node: HTMLElement | null) => void;

export type CarouselEngine = {
  canScrollNext: boolean;
  canScrollPrev: boolean;
  scrollNext: () => void;
  scrollPrev: () => void;
  carouselRef: ViewportRefType;
};

export function useCarouselEngine() {
  const engine = useRef<EngineType>();
  const [viewport, setViewport] = useState<HTMLElement>();
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);

  const scrollNext = useCallback(() => {
    if (engine.current) {
      const next = engine.current.index.add(1).get();
      engine.current.scrollTo(next, -1);

      setCanScrollNext(engine.current.canScrollNext());
      setCanScrollPrev(engine.current.canScrollPrev());
    }
  }, []);

  const scrollPrev = useCallback(() => {
    if (engine.current) {
      const prev = engine.current.index.add(-1).get();
      engine.current.scrollTo(prev, 1);

      setCanScrollNext(engine.current.canScrollNext());
      setCanScrollPrev(engine.current.canScrollPrev());
    }
  }, []);

  useEffect(() => {
    if (viewport) {
      const container = <HTMLElement>viewport.children[0];
      const slides = [].slice.call(container.children);

      engine.current = Engine(container, slides);

      setCanScrollNext(engine.current.canScrollNext());
      setCanScrollPrev(engine.current.canScrollPrev());
    }
  }, [viewport]);

  return {
    carouselRef: <ViewportRefType>setViewport,
    scrollNext,
    scrollPrev,
    canScrollNext,
    canScrollPrev,
  };
}
