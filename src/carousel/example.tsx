import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '.';

export default function CarouselExample() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen space-y-20">
      <Carousel className="max-w-lg">
        <CarouselContent>
          {Array.from({ length: 4 }).map((_, index) => (
            <CarouselItem key={index} className="basis-1/2">
              <div className="p-1">
                <div className="border border-slate-500">
                  <div className="flex items-center justify-center p-6 aspect-square">
                    <span className="text-4xl font-semibold text-slate-200">
                      {index + 1}
                    </span>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
