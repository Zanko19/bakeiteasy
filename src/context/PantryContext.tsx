'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { PantryItem } from '@/types/ingredient';

interface PantryContextType {
  pantryItems: PantryItem[];
  addToPantry: (ingredientId: string, quantity: number) => void;
  removeFromPantry: (ingredientId: string) => void;
  updateQuantity: (ingredientId: string, quantity: number) => void;
  clearPantry: () => void;
  isInPantry: (ingredientId: string) => boolean;
  getQuantity: (ingredientId: string) => number;
}

const PantryContext = createContext<PantryContextType | undefined>(undefined);

export function PantryProvider({ children }: { children: ReactNode }) {
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);

  // Chargement des ingrédients depuis localStorage au démarrage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bakeiteasy_pantry');
      if (saved) {
        try {
          setPantryItems(JSON.parse(saved));
        } catch (e) {
          console.error('Erreur lors du chargement du garde-manger:', e);
        }
      }
    }
  }, []);

  // Sauvegarde dans localStorage à chaque modification
  useEffect(() => {
    if (typeof window !== 'undefined' && pantryItems.length > 0) {
      localStorage.setItem('bakeiteasy_pantry', JSON.stringify(pantryItems));
    }
  }, [pantryItems]);

  const addToPantry = (ingredientId: string, quantity: number) => {
    if (isInPantry(ingredientId)) {
      updateQuantity(ingredientId, quantity);
    } else {
      setPantryItems([...pantryItems, { ingredientId, quantity }]);
    }
  };

  const removeFromPantry = (ingredientId: string) => {
    setPantryItems(pantryItems.filter(item => item.ingredientId !== ingredientId));
  };

  const updateQuantity = (ingredientId: string, quantity: number) => {
    setPantryItems(
      pantryItems.map(item => 
        item.ingredientId === ingredientId ? { ...item, quantity } : item
      )
    );
  };

  const clearPantry = () => {
    setPantryItems([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('bakeiteasy_pantry');
    }
  };

  const isInPantry = (ingredientId: string) => {
    return pantryItems.some(item => item.ingredientId === ingredientId);
  };

  const getQuantity = (ingredientId: string) => {
    const item = pantryItems.find(item => item.ingredientId === ingredientId);
    return item ? item.quantity : 0;
  };

  return (
    <PantryContext.Provider value={{ 
      pantryItems,
      addToPantry,
      removeFromPantry,
      updateQuantity,
      clearPantry,
      isInPantry,
      getQuantity
    }}>
      {children}
    </PantryContext.Provider>
  );
}

export function usePantry() {
  const context = useContext(PantryContext);
  if (context === undefined) {
    throw new Error('usePantry doit être utilisé à l\'intérieur d\'un PantryProvider');
  }
  return context;
} 