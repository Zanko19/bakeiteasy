'use client';

import React from 'react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  onRatingChange?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

export default function StarRating({ 
  rating, 
  maxRating = 5, 
  onRatingChange,
  size = 'md',
  interactive = false
}: StarRatingProps) {
  const stars = [];
  
  const sizeClass = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-2xl'
  };
  
  for (let i = 1; i <= maxRating; i++) {
    stars.push(
      <button
        key={i}
        disabled={!interactive}
        onClick={() => interactive && onRatingChange?.(i)}
        className={`${sizeClass[size]} ${interactive ? 'cursor-pointer' : 'cursor-default'} text-amber-500`}
      >
        {i <= rating ? '★' : '☆'}
      </button>
    );
  }
  
  return (
    <div className="flex">
      {stars}
    </div>
  );
} 