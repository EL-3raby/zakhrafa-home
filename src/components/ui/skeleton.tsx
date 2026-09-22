import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: 'default' | 'card' | 'circle' | 'text';
}

export function Skeleton({
  className = '',
  variant = 'default',
  ...props
}: SkeletonProps) {
  const variantStyles = {
    default: 'rounded-md',
    card: 'rounded-2xl',
    circle: 'rounded-full',
    text: 'rounded h-4 w-full',
  }[variant];

  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden bg-stone-200/80 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.8s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent ${variantStyles} ${className}`}
      {...props}
    />
  );
}
