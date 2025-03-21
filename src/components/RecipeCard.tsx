'use client';

import Image from "next/image";
import Link from "next/link";
import { Recipe } from "@/types/recipe";
import StarRating from "./StarRating";
import { useRecipesContext } from "@/context/RecipesContext";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const { isFavorite, toggleFavorite } = useRecipesContext();
  const favorite = isFavorite(recipe.id);

  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link href={`/recipes/${recipe.id}`} className="block">
        <div className="relative h-48 w-full">
          <Image 
            src={recipe.imageUrl} 
            alt={recipe.title} 
            fill 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
          <button 
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(recipe.id);
            }}
            className="absolute top-2 right-2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 text-xl transition-all duration-200"
          >
            {favorite ? '❤️' : '🤍'}
          </button>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{recipe.title}</h3>
          <div className="mt-2 mb-2">
            <StarRating rating={recipe.rating || 0} />
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>⏱️ {recipe.preparationTime} min</span>
            <span>📊 {recipe.difficulty}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
