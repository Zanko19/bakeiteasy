import { Recipe } from '@/types/recipe';

/**
 * Recherche des recettes par titre
 * @param recipes Liste des recettes à filtrer
 * @param searchTerm Terme de recherche à utiliser
 * @returns Recettes filtrées dont le titre contient le terme de recherche
 */
export function searchRecipesByTitle(recipes: Recipe[], searchTerm: string): Recipe[] {
  if (!searchTerm.trim()) return recipes;
  
  const term = searchTerm.toLowerCase().trim();
  return recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(term)
  );
}

/**
 * Recherche des recettes par ingrédients
 * @param recipes Liste des recettes à filtrer
 * @param ingredients Liste des ingrédients à rechercher
 * @returns Recettes filtrées qui contiennent au moins un des ingrédients spécifiés
 */
export function searchRecipesByIngredient(recipes: Recipe[], ingredients: string[]): Recipe[] {
  if (!ingredients.length) return recipes;
  
  return recipes.filter(recipe => {
    const recipeIngredients = recipe.ingredients.map(i => i.toLowerCase());
    return ingredients.some(ingredient => 
      recipeIngredients.some(recipeIng => recipeIng.includes(ingredient.toLowerCase()))
    );
  });
}

/**
 * Filtre les recettes par niveau de difficulté
 * @param recipes Liste des recettes à filtrer
 * @param difficulty Niveau de difficulté recherché
 * @returns Recettes filtrées correspondant au niveau de difficulté
 */
export function filterRecipesByDifficulty(recipes: Recipe[], difficulty?: string): Recipe[] {
  if (!difficulty) return recipes;
  
  return recipes.filter(recipe => 
    recipe.difficulty.toLowerCase() === difficulty.toLowerCase()
  );
}

/**
 * Trie les recettes par temps total de préparation + cuisson
 * @param recipes Liste des recettes à trier
 * @param ascending Ordre croissant (true) ou décroissant (false)
 * @returns Recettes triées par temps total
 */
export function sortRecipesByTime(recipes: Recipe[], ascending = true): Recipe[] {
  return [...recipes].sort((a, b) => {
    const timeA = a.preparationTime + a.cookingTime;
    const timeB = b.preparationTime + b.cookingTime;
    return ascending ? timeA - timeB : timeB - timeA;
  });
} 