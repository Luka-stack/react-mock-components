import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  ComponentPropsWithoutRef,
  ElementRef,
  createContext,
  forwardRef,
  useContext,
} from 'react';

import { cn } from '../lib/utils';
import { Button } from '../button';
import { CarouselEngine, useCarouselEngine } from './use-carousel-engine';

type CarouselContextProps = CarouselEngine;

const CarouselContext = createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = useContext(CarouselContext);

  if (!context) {
    throw new Error('useCarousel must be used within a CarouselProvider');
  }

  return context;
}

const Carousel = forwardRef<ElementRef<'div'>, ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => {
    const {
      carouselRef,
      scrollNext,
      scrollPrev,
      canScrollNext,
      canScrollPrev,
    } = useCarouselEngine();

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          scrollNext,
          scrollPrev,
          canScrollNext,
          canScrollPrev,
        }}
      >
        <div ref={ref} className={cn('relative', className)} {...props} />
      </CarouselContext.Provider>
    );
  }
);

const CarouselContent = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => {
  const { carouselRef } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          'flex -ml-4 transition-transform duration-500 ease-in-out',
          className
        )}
        {...props}
      />
    </div>
  );
});

const CarouselItem = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('min-w-0 shrink-0 grow-0 basis-full pl-4', className)}
      {...props}
    />
  );
});

const CarouselPrevious = forwardRef<
  ElementRef<'button'>,
  ComponentPropsWithoutRef<typeof Button>
>(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
  const { scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      ref={ref}
      size={size}
      variant={variant}
      disabled={!canScrollPrev}
      className={cn(
        'absolute h-8 w-8 rounded-full -left-12 top-1/2 -translate-y-1/2',
        className
      )}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="w-4 h-4" />
    </Button>
  );
});

const CarouselNext = forwardRef<
  ElementRef<'button'>,
  ComponentPropsWithoutRef<typeof Button>
>(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
  const { scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      ref={ref}
      size={size}
      variant={variant}
      onClick={scrollNext}
      disabled={!canScrollNext}
      className={cn(
        'absolute h-8 w-8 rounded-full -right-12 top-1/2 -translate-y-1/2',
        className
      )}
      {...props}
    >
      <ArrowRight className="w-4 h-4" />
    </Button>
  );
});

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
