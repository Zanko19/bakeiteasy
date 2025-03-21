'use client';

// src/components/IngredientChip.tsx
import React from 'react';

interface IngredientChipProps {
  name: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function IngredientChip({ name, selected = false, onClick }: IngredientChipProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm font-medium m-1 transition-colors
        ${selected 
          ? 'bg-amber-600 text-white' 
          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
        }`}
    >
      {name}
    </button>
  );
}