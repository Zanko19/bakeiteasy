import Image from "next/image";
import Link from "next/link";
import { Recipe } from "@/types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipes/${recipe.id}`} className="block">
      <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48 w-full">
          <Image 
            src={recipe.imageUrl} 
            alt={recipe.title} 
            fill 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{recipe.title}</h3>
          <div className="mt-2 flex justify-between text-sm text-gray-600">
            <span>⏱️ {recipe.preparationTime} min</span>
            <span>📊 {recipe.difficulty}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
