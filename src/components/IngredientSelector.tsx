'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Ingredient } from '@/types/ingredient';
import { usePantry } from '@/context/PantryContext';

interface IngredientSelectorProps {
  ingredient: Ingredient;
}

export default function IngredientSelector({ ingredient }: IngredientSelectorProps) {
  const { isInPantry, addToPantry, removeFromPantry, getQuantity, updateQuantity } = usePantry();
  const [quantity, setQuantity] = useState(getQuantity(ingredient.id) || 1);
  const selected = isInPantry(ingredient.id);

  const handleToggle = () => {
    if (selected) {
      removeFromPantry(ingredient.id);
    } else {
      addToPantry(ingredient.id, quantity);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      setQuantity(newQuantity);
      if (selected) {
        updateQuantity(ingredient.id, newQuantity);
      }
    }
  };

  return (
    <div 
      className={`relative border rounded-lg p-2 cursor-pointer transition-all
        ${selected ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-gray-300'}`}
    >
      <div className="flex flex-col items-center" onClick={handleToggle}>
        <div className="relative w-24 h-24 mb-2 rounded-lg overflow-hidden">
          <Image
            src={ingredient.imageUrl}
            alt={ingredient.name}
            fill
            className="object-cover"
            sizes="96px"
          />
          {selected && (
            <div className="absolute inset-0 bg-amber-500 bg-opacity-20 flex items-center justify-center">
              <span className="text-2xl">✓</span>
            </div>
          )}
        </div>
        <span className="text-sm font-medium text-center">{ingredient.name}</span>
      </div>
      
      <div className="mt-2 flex items-center justify-center">
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          onClick={(e) => e.stopPropagation()}
          className={`w-14 px-1 py-0.5 text-sm border rounded text-center
            ${selected ? 'border-amber-300' : 'border-gray-200'}`}
        />
        <span className="ml-1 text-xs text-gray-500">{ingredient.unit}</span>
      </div>
    </div>
  );
} 