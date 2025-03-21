import { useState, useEffect, useCallback } from 'react';
import * as spoonacularApi from '@/services/spoonacularApi';
import { SpoonacularIngredient, SpoonacularRecipe } from '@/services/spoonacularApi';

interface UseIngredientsSearchResult {
  ingredients: SpoonacularIngredient[];
  loading: boolean;
  error: string | null;
  searchIngredients: (query: string, limit?: number) => Promise<void>;
}

interface UseRecipeSearchResult {
  recipes: SpoonacularRecipe[];
  loading: boolean;
  error: string | null;
  searchRecipes: (query: string, options?: RecipeSearchOptions) => Promise<void>;
  findRecipesByIngredients: (ingredients: string[], limit?: number) => Promise<void>;
  getRandomRecipes: (limit?: number, tags?: string[]) => Promise<void>;
}

interface RecipeSearchOptions {
  cuisine?: string;
  diet?: string;
  intolerances?: string;
  type?: string;
  limit?: number;
}

/**
 * Hook pour rechercher des ingrédients
 */
export function useIngredientsSearch(): UseIngredientsSearchResult {
  const [ingredients, setIngredients] = useState<SpoonacularIngredient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchIngredients = useCallback(async (query: string, limit: number = 10) => {
    setLoading(true);
    setError(null);

    try {
      const results = await spoonacularApi.searchIngredients(query, limit);
      setIngredients(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      setIngredients([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { ingredients, loading, error, searchIngredients };
}

/**
 * Hook pour rechercher des recettes
 */
export function useRecipeSearch(): UseRecipeSearchResult {
  const [recipes, setRecipes] = useState<SpoonacularRecipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchRecipes = useCallback(async (query: string, options?: RecipeSearchOptions) => {
    setLoading(true);
    setError(null);

    try {
      const results = await spoonacularApi.searchRecipes(
        query, 
        options?.cuisine,
        options?.diet,
        options?.intolerances,
        options?.type,
        options?.limit || 10
      );
      setRecipes(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const findRecipesByIngredients = useCallback(async (ingredients: string[], limit: number = 10) => {
    setLoading(true);
    setError(null);

    try {
      const results = await spoonacularApi.findRecipesByIngredients(ingredients, limit);
      setRecipes(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getRandomRecipes = useCallback(async (limit: number = 10, tags?: string[]) => {
    setLoading(true);
    setError(null);

    try {
      const results = await spoonacularApi.getRandomRecipes(limit, tags);
      setRecipes(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { 
    recipes, 
    loading, 
    error, 
    searchRecipes, 
    findRecipesByIngredients,
    getRandomRecipes
  };
}

/**
 * Hook pour récupérer les détails d'une recette
 */
export function useRecipeDetails(recipeId?: number) {
  const [recipe, setRecipe] = useState<SpoonacularRecipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      if (!recipeId) return;
      
      setLoading(true);
      setError(null);

      try {
        const result = await spoonacularApi.getRecipeDetails(recipeId);
        setRecipe(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  return { recipe, loading, error };
} 