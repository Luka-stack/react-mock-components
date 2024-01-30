import {
  ComponentPropsWithoutRef,
  ElementRef,
  ReactNode,
  forwardRef,
} from 'react';
import { cn } from '../lib/utils';

const Card = forwardRef<ElementRef<'div'>, ComponentPropsWithoutRef<'div'>>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'card flex flex-col flex-none h-full p-4 transition-transform duration-200 border rounded-md w-72 border-slate-500 bg-slate-900 card-carousel group',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

const CardContent = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('content text-slate-200 overflow-y-auto h-full', className)}
      {...props}
    >
      {children}
    </div>
  );
});

const CardHeader = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-5 text-left mb-5', className)}
      {...props}
    >
      {children}
    </div>
  );
});

const CardTitle = forwardRef<ElementRef<'h2'>, ComponentPropsWithoutRef<'h2'>>(
  ({ children, className, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn(
          'title text-xl font-bold leading-none tracking-tight text-slate-200 transition-colors cards-title',
          className
        )}
        {...props}
      >
        {children}
      </h2>
    );
  }
);

const CardDescription = forwardRef<
  ElementRef<'p'>,
  ComponentPropsWithoutRef<'p'>
>(({ children, className, ...props }, ref) => {
  return (
    <p ref={ref} className={cn('text-sm text-slate-500', className)} {...props}>
      {children}
    </p>
  );
});

const Cards = ({ children }: { children: ReactNode }) => {
  return (
    <div className="cards flex p-10 h-[500px] overflow-x-auto">{children}</div>
  );
};

export { Cards, Card, CardContent, CardHeader, CardTitle, CardDescription };
