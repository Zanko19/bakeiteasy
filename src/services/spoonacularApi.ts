/**
 * Service pour l'API Spoonacular
 * Documentation: https://spoonacular.com/food-api/docs
 */

// L'URL de base de l'API Spoonacular
const API_BASE_URL = 'https://api.spoonacular.com';
const API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;

// Types pour les réponses de l'API
export interface SpoonacularIngredient {
  id: number;
  name: string;
  image: string;
  aisle: string; // Le rayon où se trouve l'ingrédient
  possibleUnits: string[];
}

export interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
  instructions: string;
  extendedIngredients: {
    id: number;
    name: string;
    amount: number;
    unit: string;
    image: string;
  }[];
}

/**
 * Construit une URL avec les paramètres et la clé API
 */
function buildUrl(endpoint: string, params: Record<string, string | number | boolean> = {}): string {
  // Vérification de la clé API
  if (!API_KEY) {
    console.error("ERREUR: Clé API Spoonacular non définie!");
    console.log("Vérifiez vos variables d'environnement:", process.env);
  }
  
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  
  // Ajouter les paramètres à l'URL
  Object.entries({ ...params, apiKey: API_KEY }).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });
  
  console.log("URL de requête Spoonacular:", url.toString().replace(API_KEY || '', '[API_KEY]'));
  return url.toString();
}

/**
 * Recherche des ingrédients par nom
 */
export async function searchIngredients(query: string, number: number = 10): Promise<SpoonacularIngredient[]> {
  console.log(`Recherche d'ingrédients pour: "${query}"`);
  
  const url = buildUrl('/food/ingredients/search', {
    query,
    number,
    metaInformation: true,
  });
  
  try {
    console.log("Envoi de la requête...");
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Erreur API (${response.status}): ${errorText}`);
      throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`Résultats obtenus: ${data.results?.length || 0} ingrédients`);
    
    if (!data.results || data.results.length === 0) {
      console.log("Aucun résultat trouvé pour cette recherche");
    }
    
    return data.results || [];
  } catch (error) {
    console.error('Erreur lors de la recherche d\'ingrédients:', error);
    return [];
  }
}

/**
 * Obtient les informations détaillées sur un ingrédient
 */
export async function getIngredientInfo(id: number): Promise<SpoonacularIngredient | null> {
  const url = buildUrl(`/food/ingredients/${id}/information`, {
    amount: 1,
  });
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Erreur lors de la récupération des informations de l'ingrédient ${id}:`, error);
    return null;
  }
}

/**
 * Récupère l'URL de l'image d'un ingrédient
 */
export function getIngredientImageUrl(imageName: string, size: 'small' | 'medium' | 'large' = 'medium'): string {
  if (!imageName) {
    console.warn("Nom d'image non fourni pour l'ingrédient");
    return '';
  }
  
  const sizeMap = {
    small: '100x100',
    medium: '250x250',
    large: '500x500'
  };
  
  const imageUrl = `${API_BASE_URL}/cdn/ingredients_${sizeMap[size]}/${imageName}`;
  return imageUrl;
}

/**
 * Recherche des recettes par ingrédients
 */
export async function findRecipesByIngredients(
  ingredients: string[],
  number: number = 10,
  ranking: number = 1 // 1: maximize used ingredients, 2: minimize missing ingredients
): Promise<SpoonacularRecipe[]> {
  if (!ingredients || ingredients.length === 0) {
    console.warn("Aucun ingrédient fourni pour la recherche de recettes");
    return [];
  }
  
  const url = buildUrl('/recipes/findByIngredients', {
    ingredients: ingredients.join(','),
    number,
    ranking,
    ignorePantry: true
  });
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la recherche de recettes par ingrédients:', error);
    return [];
  }
}

/**
 * Recherche des recettes par texte
 */
export async function searchRecipes(
  query: string,
  cuisine?: string,
  diet?: string,
  intolerances?: string,
  type?: string,
  number: number = 10
): Promise<SpoonacularRecipe[]> {
  const params: Record<string, string | number | boolean> = {
    query,
    number
  };
  
  // Ajouter les paramètres optionnels s'ils sont définis
  if (cuisine) params.cuisine = cuisine;
  if (diet) params.diet = diet;
  if (intolerances) params.intolerances = intolerances;
  if (type) params.type = type;
  
  const url = buildUrl('/recipes/complexSearch', {
    ...params,
    addRecipeInformation: true,
    fillIngredients: true
  });
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Erreur lors de la recherche de recettes:', error);
    return [];
  }
}

/**
 * Récupère les informations détaillées d'une recette
 */
export async function getRecipeDetails(id: number): Promise<SpoonacularRecipe | null> {
  const url = buildUrl(`/recipes/${id}/information`, {
    includeNutrition: false
  });
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Erreur lors de la récupération des détails de la recette ${id}:`, error);
    return null;
  }
}

/**
 * Récupère des recettes aléatoires
 */
export async function getRandomRecipes(
  number: number = 10,
  tags?: string[]
): Promise<SpoonacularRecipe[]> {
  const params: Record<string, string | number | boolean> = { number };
  
  if (tags && tags.length > 0) {
    params.tags = tags.join(',');
  }
  
  const url = buildUrl('/recipes/random', params);
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.recipes || [];
  } catch (error) {
    console.error('Erreur lors de la récupération de recettes aléatoires:', error);
    return [];
  }
} 