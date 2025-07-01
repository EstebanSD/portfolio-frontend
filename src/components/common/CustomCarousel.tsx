'use client';

import React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui';
import { cn } from '@/lib/shadcn/utils';

interface CustomCarouselProps {
  items: React.ReactNode[];
  className?: string;
  itemClassName?: string;
  showDots?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  navigationStyle?: 'default' | 'minimal' | 'floating' | 'none';
  orientation?: 'horizontal' | 'vertical';
}

export const CustomCarousel: React.FC<CustomCarouselProps> = ({
  items,
  className = '',
  itemClassName = '',
  showDots = false,
  autoplay = false,
  autoplayDelay = 3000,
  navigationStyle = 'default',
  orientation = 'horizontal',
}) => {
  const autoplayPlugin = React.useRef(
    autoplay ? Autoplay({ delay: autoplayDelay, stopOnInteraction: true }) : null,
  );

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [api, setApi] = React.useState<CarouselApi>();

  React.useEffect(() => {
    if (!api) return;

    api.on('select', () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  const getNavigationClasses = () => {
    switch (navigationStyle) {
      case 'minimal':
        return {
          prev: 'h-8 w-8 bg-white/80 border-0 shadow-sm hover:bg-secondary hover:text-secondary-foreground',
          next: 'h-8 w-8 bg-white/80 border-0 shadow-sm hover:bg-secondary hover:text-secondary-foreground',
        };
      case 'floating':
        return {
          prev: 'h-10 w-10 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:bg-secondary hover:text-secondary-foreground hover:shadow-xl transition-all',
          next: 'h-10 w-10 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:bg-secondary hover:text-secondary-foreground hover:shadow-xl transition-all',
        };
      default:
        return {
          prev: '',
          next: '',
        };
    }
  };

  const navClasses = getNavigationClasses();

  const plugins = autoplayPlugin.current ? [autoplayPlugin.current] : [];

  return (
    <div className={cn('relative w-full', className)}>
      <Carousel
        plugins={plugins}
        onMouseEnter={() => autoplayPlugin.current?.stop()}
        onMouseLeave={() => autoplayPlugin.current?.play()}
        setApi={setApi}
        orientation={orientation}
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={index} className={cn('md:basis-1/2 lg:basis-1/3', itemClassName)}>
              {item}
            </CarouselItem>
          ))}
        </CarouselContent>

        {navigationStyle !== 'none' && (
          <>
            <CarouselPrevious className={navClasses.prev} />
            <CarouselNext className={navClasses.next} />
          </>
        )}
      </Carousel>

      {/* Dots Indicator */}
      {showDots && (
        <div className="flex justify-center mt-4 space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                currentIndex === index ? 'bg-primary w-6' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
