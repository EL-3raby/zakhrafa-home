'use client';

import React from 'react';
import * as LucideIcons from 'lucide-react';

interface DynamicLucideIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const DynamicLucideIcon: React.FC<DynamicLucideIconProps> = ({
  name,
  className = 'w-5 h-5',
  size,
}) => {
  // Normalize icon name (e.g. sofa -> Sofa, utensils-crossed -> UtensilsCrossed)
  const formattedName = name
    ? name
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('')
    : 'FolderTree';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (LucideIcons as Record<string, any>)[formattedName] || LucideIcons.FolderTree;

  return <IconComponent className={className} size={size} />;
};
