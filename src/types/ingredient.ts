export interface Ingredient {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  unit: string; // g, ml, pièce, etc.
}

export interface IngredientCategory {
  id: string;
  name: string;
  icon: string;
}

export interface PantryItem {
  ingredientId: string;
  quantity: number;
} 