'use client';

import React from 'react';
import { usePantry } from '@/context/PantryContext';
import { ingredients } from '@/data/ingredients';

export default function PantryList() {
  const { pantryItems, removeFromPantry, updateQuantity, clearPantry } = usePantry();
  
  if (pantryItems.length === 0) {
    return (
      <div className="border rounded-lg p-6 bg-gray-50">
        <p className="text-gray-500 text-center italic">
          Vous navez pas encore sélectionné dingrédients.
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-amber-500 text-white px-4 py-3 flex justify-between items-center">
        <h3 className="font-semibold">Mes ingrédients ({pantryItems.length})</h3>
        <button 
          onClick={clearPantry}
          className="text-sm bg-amber-600 hover:bg-amber-700 px-3 py-1 rounded transition"
        >
          Tout effacer
        </button>
      </div>
      
      <ul className="divide-y">
        {pantryItems.map(item => {
          const ingredient = ingredients.find(ing => ing.id === item.ingredientId);
          if (!ingredient) return null;
          
          return (
            <li key={item.ingredientId} className="flex items-center justify-between p-3 hover:bg-gray-50">
              <div>
                <span className="font-medium">{ingredient.name}</span>
                <div className="text-sm text-gray-500">
                  {item.quantity} {ingredient.unit}
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => {
                    const newQuantity = parseInt(e.target.value);
                    if (newQuantity > 0) {
                      updateQuantity(item.ingredientId, newQuantity);
                    }
                  }}
                  className="w-16 px-2 py-1 border rounded mr-2 text-center"
                />
                
                <button 
                  onClick={() => removeFromPantry(item.ingredientId)}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Supprimer"
                >
                  ✕
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
} 