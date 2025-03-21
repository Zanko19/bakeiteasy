'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useIngredientsSearch } from '@/hooks/useSpoonacular';

export default function SpoonacularTestPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { ingredients, loading, error, searchIngredients } = useIngredientsSearch();
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      await searchIngredients(searchQuery);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-amber-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-white hover:text-amber-200 mr-4">
              ← Accueil
            </Link>
            <h1 className="text-2xl font-bold">Test API Spoonacular</h1>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto p-8">
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Recherche d&apos;ingrédients</h2>
          
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex max-w-2xl">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un ingrédient (en anglais)..."
                className="flex-grow border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-r-lg transition"
                disabled={loading}
              >
                {loading ? 'Recherche...' : 'Rechercher'}
              </button>
            </div>
          </form>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {ingredients.map((ingredient) => (
              <div key={ingredient.id} className="border rounded-lg p-4 flex flex-col items-center">
                <div className="w-24 h-24 mb-3 relative">
                  {ingredient.image && (
                    <Image
                      src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                      alt={ingredient.name}
                      fill
                      className="object-contain"
                      sizes="96px"
                    />
                  )}
                </div>
                <p className="text-center font-medium">{ingredient.name}</p>
                <p className="text-xs text-gray-500 text-center mt-1">{ingredient.aisle}</p>
              </div>
            ))}
          </div>
          
          {ingredients.length === 0 && !loading && !error && (
            <p className="text-gray-500 italic">Aucun ingrédient trouvé. Essayez une recherche.</p>
          )}
        </section>
        
        <section className="mb-10">
          <h3 className="text-xl font-semibold mb-4">Comment utiliser l&apos;API</h3>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="mb-4">
              Pour utiliser l&apos;API Spoonacular dans votre application, vous pouvez utiliser les hooks que nous avons créés:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><code className="bg-gray-100 px-1 py-0.5 rounded">useIngredientsSearch</code> - Pour rechercher des ingrédients</li>
              <li><code className="bg-gray-100 px-1 py-0.5 rounded">useRecipeSearch</code> - Pour rechercher des recettes</li>
              <li><code className="bg-gray-100 px-1 py-0.5 rounded">useRecipeDetails</code> - Pour obtenir les détails d&apos;une recette spécifique</li>
            </ul>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-100 p-4">
        <div className="container mx-auto text-center text-gray-500">
          © {new Date().getFullYear()} BakeItEasy - Tous droits réservés
        </div>
      </footer>
    </div>
  );
} 