import { Ingredient, IngredientCategory } from '@/types/ingredient';

// Catégories d'ingrédients
export const categories: IngredientCategory[] = [
  { id: "dairy", name: "Produits laitiers", icon: "🥛" },
  { id: "cereals", name: "Céréales et farines", icon: "🌾" },
  { id: "fruits", name: "Fruits", icon: "🍎" },
  { id: "vegetables", name: "Légumes", icon: "🥦" },
  { id: "proteins", name: "Protéines", icon: "🥩" },
  { id: "fat", name: "Matières grasses", icon: "🧈" },
  { id: "sweeteners", name: "Sucres et édulcorants", icon: "🍯" },
  { id: "spices", name: "Épices et aromates", icon: "🌶️" },
  { id: "other", name: "Autres", icon: "🧂" }
];

// Liste des ingrédients
export const ingredients: Ingredient[] = [
  // Produits laitiers
  { id: "egg", name: "Œuf", category: "dairy", imageUrl: "/images/ingredients/egg.jpg", unit: "pièce" },
  { id: "milk", name: "Lait", category: "dairy", imageUrl: "/images/ingredients/milk.jpg", unit: "ml" },
  { id: "butter", name: "Beurre", category: "fat", imageUrl: "/images/ingredients/butter.jpg", unit: "g" },
  { id: "cream", name: "Crème fraîche", category: "dairy", imageUrl: "/images/ingredients/cream.jpg", unit: "ml" },
  { id: "yogurt", name: "Yaourt nature", category: "dairy", imageUrl: "/images/ingredients/yogurt.jpg", unit: "g" },
  
  // Céréales et farines
  { id: "flour", name: "Farine", category: "cereals", imageUrl: "/images/ingredients/flour.jpg", unit: "g" },
  { id: "bread_crumbs", name: "Chapelure", category: "cereals", imageUrl: "/images/ingredients/bread_crumbs.jpg", unit: "g" },
  { id: "oats", name: "Flocons d'avoine", category: "cereals", imageUrl: "/images/ingredients/oats.jpg", unit: "g" },
  
  // Sucres et édulcorants
  { id: "sugar", name: "Sucre", category: "sweeteners", imageUrl: "/images/ingredients/sugar.jpg", unit: "g" },
  { id: "honey", name: "Miel", category: "sweeteners", imageUrl: "/images/ingredients/honey.jpg", unit: "g" },
  { id: "brown_sugar", name: "Sucre roux", category: "sweeteners", imageUrl: "/images/ingredients/brown_sugar.jpg", unit: "g" },
  
  // Fruits
  { id: "apple", name: "Pomme", category: "fruits", imageUrl: "/images/ingredients/apple.jpg", unit: "pièce" },
  { id: "lemon", name: "Citron", category: "fruits", imageUrl: "/images/ingredients/lemon.jpg", unit: "pièce" },
  { id: "banana", name: "Banane", category: "fruits", imageUrl: "/images/ingredients/banana.jpg", unit: "pièce" },
  { id: "berries", name: "Baies (mix)", category: "fruits", imageUrl: "/images/ingredients/berries.jpg", unit: "g" },
  
  // Autres
  { id: "chocolate", name: "Chocolat noir", category: "other", imageUrl: "/images/ingredients/chocolate.jpg", unit: "g" },
  { id: "vanilla", name: "Extrait de vanille", category: "spices", imageUrl: "/images/ingredients/vanilla.jpg", unit: "ml" },
  { id: "cinnamon", name: "Cannelle", category: "spices", imageUrl: "/images/ingredients/cinnamon.jpg", unit: "g" }
]; 