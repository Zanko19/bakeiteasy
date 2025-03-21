// src/context/RecipesContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Recipe } from '@/types/recipe';
import { useRecipes } from '@/hooks/useRecipes';

interface RecipesContextType {
  recipes: Recipe[];
  favorites: string[];
  loading: boolean;
  error: Error | null;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

export function RecipesProvider({ children }: { children: ReactNode }) {
  const { recipes, loading, error } = useRecipes();
  const [favorites, setFavorites] = useState<string[]>(() => {
    // Récupérer les favoris du localStorage au chargement
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('favorites');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const toggleFavorite = (id: string) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter(favId => favId !== id)
      : [...favorites, id];
    
    setFavorites(newFavorites);
    // Sauvegarder dans localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return (
    <RecipesContext.Provider value={{ recipes, favorites, loading, error, toggleFavorite, isFavorite }}>
      {children}
    </RecipesContext.Provider>
  );
}

export function useRecipesContext() {
  const context = useContext(RecipesContext);
  if (context === undefined) {
    throw new Error('useRecipesContext doit être utilisé à l\'intérieur d\'un RecipesProvider');
  }
  return context;
}