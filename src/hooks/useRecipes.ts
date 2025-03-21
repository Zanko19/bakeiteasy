'use client';

import { useState, useEffect } from 'react';
import { Recipe } from '@/types/recipe';
import { recipes as mockRecipes } from '@/data/recipes';

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Dans un environnement réel, vous pourriez appeler votre API ici
    // Pour l'instant, nous utilisons les données mockées
    try {
      setRecipes(mockRecipes);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Une erreur est survenue'));
      setLoading(false);
    }
  }, []);

  return { recipes, loading, error };
}
