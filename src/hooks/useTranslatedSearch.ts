import { useState, useCallback } from 'react';
import * as spoonacularApi from '@/services/spoonacularApi';
import { SpoonacularIngredient, SpoonacularRecipe } from '@/services/spoonacularApi';
import { translateToEnglish, translateToFrench, translateArrayToFrench, translateObjectToFrench } from '@/services/translationService';

interface UseTranslatedIngredientsSearchResult {
  ingredients: SpoonacularIngredient[];
  loading: boolean;
  error: string | null;
  searchIngredients: (query: string, limit?: number) => Promise<void>;
  originalQuery: string;
  translatedQuery: string;
}

interface UseTranslatedRecipeSearchResult {
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
 * Hook pour rechercher des ingrédients avec traduction automatique
 */
export function useTranslatedIngredientsSearch(): UseTranslatedIngredientsSearchResult {
  const [ingredients, setIngredients] = useState<SpoonacularIngredient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [originalQuery, setOriginalQuery] = useState<string>('');
  const [translatedQuery, setTranslatedQuery] = useState<string>('');

  const searchIngredients = useCallback(async (query: string, limit: number = 10) => {
    setLoading(true);
    setError(null);
    setOriginalQuery(query);

    try {
      // 1. Traduire la requête en anglais
      const englishQuery = await translateToEnglish(query);
      setTranslatedQuery(englishQuery);
      console.log(`Requête traduite: "${query}" → "${englishQuery}"`);

      // 2. Rechercher avec la requête traduite
      const results = await spoonacularApi.searchIngredients(englishQuery, limit);
      
      // 3. Traduire les résultats en français
      const translatedResults = await Promise.all(
        results.map(async (ingredient) => {
          // Créer une copie pour ne pas modifier l'original
          const translatedIngredient = { ...ingredient };
          
          // Traduire le nom et le rayon
          translatedIngredient.name = await translateToFrench(ingredient.name);
          translatedIngredient.aisle = await translateToFrench(ingredient.aisle);
          
          return translatedIngredient;
        })
      );
      
      setIngredients(translatedResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      setIngredients([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { 
    ingredients, 
    loading, 
    error, 
    searchIngredients,
    originalQuery,
    translatedQuery
  };
}

/**
 * Hook pour rechercher des recettes avec traduction automatique
 */
export function useTranslatedRecipeSearch(): UseTranslatedRecipeSearchResult {
  const [recipes, setRecipes] = useState<SpoonacularRecipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchRecipes = useCallback(async (query: string, options?: RecipeSearchOptions) => {
    setLoading(true);
    setError(null);

    try {
      // 1. Traduire la requête en anglais
      const englishQuery = await translateToEnglish(query);
      console.log(`Requête traduite: "${query}" → "${englishQuery}"`);

      // 2. Rechercher avec la requête traduite
      const results = await spoonacularApi.searchRecipes(
        englishQuery, 
        options?.cuisine,
        options?.diet,
        options?.intolerances,
        options?.type,
        options?.limit || 10
      );
      
      // 3. Traduire les résultats en français
      const translatedResults = await translateArrayToFrench(
        results, 
        ['title', 'summary', 'instructions']
      );
      
      setRecipes(translatedResults);
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
      // 1. Traduire les ingrédients en anglais
      const translatedIngredients = await Promise.all(
        ingredients.map(ingredient => translateToEnglish(ingredient))
      );

      // 2. Rechercher avec les ingrédients traduits
      const results = await spoonacularApi.findRecipesByIngredients(translatedIngredients, limit);
      
      // 3. Traduire les résultats en français
      const translatedResults = await Promise.all(
        results.map(async (recipe) => {
          const translatedRecipe = await translateObjectToFrench(
            recipe, 
            ['title', 'summary', 'instructions']
          );
          
          // Si la recette a des ingrédients étendus, traduire leurs noms aussi
          if (translatedRecipe.extendedIngredients) {
            translatedRecipe.extendedIngredients = await Promise.all(
              translatedRecipe.extendedIngredients.map(async (ingredient) => {
                const translatedIngredient = { ...ingredient };
                translatedIngredient.name = await translateToFrench(ingredient.name);
                return translatedIngredient;
              })
            );
          }
          
          return translatedRecipe;
        })
      );
      
      setRecipes(translatedResults);
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
      // 1. Traduire les tags en anglais si nécessaire
      const translatedTags = tags 
        ? await Promise.all(tags.map(tag => translateToEnglish(tag)))
        : undefined;

      // 2. Récupérer des recettes aléatoires
      const results = await spoonacularApi.getRandomRecipes(limit, translatedTags);
      
      // 3. Traduire les résultats en français
      const translatedResults = await translateArrayToFrench(
        results, 
        ['title', 'summary', 'instructions']
      );
      
      setRecipes(translatedResults);
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