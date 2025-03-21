'use client';

import React, { useState } from 'react';
import { IngredientCategory as CategoryType } from '@/types/ingredient';
import { Ingredient } from '@/types/ingredient';
import IngredientSelector from './IngredientSelector';

interface IngredientCategoryProps {
  category: CategoryType;
  ingredients: Ingredient[];
}

export default function IngredientCategory({ category, ingredients }: IngredientCategoryProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="mb-8">
      <button 
        className="flex items-center w-full text-left mb-3 group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="text-2xl mr-2">{category.icon}</span>
        <h3 className="text-xl font-semibold">{category.name}</h3>
        <span className={`ml-auto transform transition-transform ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
          ▼
        </span>
      </button>
      
      {isExpanded && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {ingredients.map(ingredient => (
            <IngredientSelector key={ingredient.id} ingredient={ingredient} />
          ))}
        </div>
      )}
    </div>
  );
} 