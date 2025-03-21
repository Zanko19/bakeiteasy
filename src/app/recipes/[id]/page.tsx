import { recipes } from "@/data/recipes";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: { id: string };
};

// Génération des métadonnées dynamiques basées sur la recette
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const recipe = recipes.find((r) => r.id === params.id);
  
  if (!recipe) {
    return {
      title: "Recette non trouvée - BakeItEasy",
    };
  }
  
  return {
    title: `${recipe.title} - BakeItEasy`,
    description: `Découvrez comment préparer ${recipe.title} en ${recipe.preparationTime + recipe.cookingTime} minutes`,
  };
}

export default function RecipePage({ params }: { params: { id: string } }) {
  const recipe = recipes.find((r) => r.id === params.id);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-amber-600 text-white p-4">
        <div className="container mx-auto flex items-center">
          <Link href="/" className="text-white hover:text-amber-200">
            ← Retour
          </Link>
          <h1 className="text-2xl font-bold ml-4">BakeItEasy</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-8">
        <article className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
            
            <div className="flex items-center gap-4 text-gray-600 mb-6">
              <span className="flex items-center">⏱️ Préparation: {recipe.preparationTime} min</span>
              <span className="flex items-center">🔥 Cuisson: {recipe.cookingTime} min</span>
              <span className="flex items-center">📊 Difficulté: {recipe.difficulty}</span>
            </div>
          </div>

          <div className="relative w-full h-96 mb-8">
            <Image
              src={recipe.imageUrl}
              alt={recipe.title}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-xl font-semibold mb-4">Ingrédients</h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Instructions</h2>
              <ol className="space-y-4">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="flex">
                    <span className="font-bold mr-2">{index + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </article>
      </main>

      <footer className="bg-gray-100 p-4">
        <div className="container mx-auto text-center text-gray-500">
          © {new Date().getFullYear()} BakeItEasy - Tous droits réservés
        </div>
      </footer>
    </div>
  );
}