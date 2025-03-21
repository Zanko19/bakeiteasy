export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  preparationTime: number;
  cookingTime: number;
  difficulty: string;
  imageUrl: string;
  rating?: number; // Note sur 5
}
