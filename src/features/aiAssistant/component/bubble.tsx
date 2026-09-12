'use client';

import * as React from 'react';

import { cn } from '@/shared/utils/utils';

function BubbleGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="bubble-group" className={cn('flex flex-col gap-1', className)} {...props} />
  );
}

function Bubble({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & { variant?: 'muted' }) {
  return (
    <div
      data-slot="bubble"
      data-variant={variant}
      className={cn(
        'flex w-fit max-w-[75%] flex-col rounded-2xl bg-primary px-3 py-2 text-primary-foreground data-[variant=muted]:bg-muted data-[variant=muted]:text-muted-foreground',
        className
      )}
      {...props}
    />
  );
}

function BubbleContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="bubble-content" className={cn('text-sm', className)} {...props} />;
}

function BubbleReactions({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="bubble-reactions"
      className={cn('mt-1 flex items-center gap-1 text-xs', className)}
      {...props}
    />
  );
}

export { BubbleGroup, Bubble, BubbleContent, BubbleReactions };
