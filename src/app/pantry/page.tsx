'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { categories } from '@/data/ingredients';
import IngredientCategory from '@/components/IngredientCategory';
import PantryList from '@/components/PantryList';
import { usePantry } from '@/context/PantryContext';
import { useIngredientsSearch } from '@/hooks/useSpoonacular';
import { SpoonacularIngredient } from '@/services/spoonacularApi';
import { Ingredient } from '@/types/ingredient';

export default function PantryPage() {
  const { pantryItems } = usePantry();
  const [searchQuery, setSearchQuery] = useState('');
  const { ingredients: spoonacularIngredients, loading, error, searchIngredients } = useIngredientsSearch();
  const [localIngredients, setLocalIngredients] = useState<Ingredient[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Convertir les ingrédients de Spoonacular au format de notre application
  useEffect(() => {
    if (spoonacularIngredients.length > 0) {
      const converted: Ingredient[] = spoonacularIngredients.map(convertSpoonacularIngredient);
      setLocalIngredients(converted);
    }
  }, [spoonacularIngredients]);

  // Fonction pour convertir un ingrédient Spoonacular au format de notre application
  const convertSpoonacularIngredient = (ingredient: SpoonacularIngredient): Ingredient => {
    // Déterminer la catégorie en fonction de l'aisle (rayon) de Spoonacular
    const category = mapAisleToCategory(ingredient.aisle);
    
    return {
      id: `spoon_${ingredient.id}`,
      name: ingredient.name,
      category,
      imageUrl: `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`,
      unit: ingredient.possibleUnits && ingredient.possibleUnits.length > 0 
        ? ingredient.possibleUnits[0] 
        : 'g'
    };
  };
  
  // Fonction pour mapper les rayons Spoonacular à nos catégories
  const mapAisleToCategory = (aisle: string): string => {
    const aisleLower = aisle?.toLowerCase() || '';
    
    if (aisleLower.includes('dairy') || aisleLower.includes('milk') || aisleLower.includes('cheese')) {
      return 'dairy';
    } else if (aisleLower.includes('baking') || aisleLower.includes('flour') || aisleLower.includes('grains')) {
      return 'cereals';
    } else if (aisleLower.includes('produce') && aisleLower.includes('fruit')) {
      return 'fruits';
    } else if (aisleLower.includes('produce') || aisleLower.includes('vegetables')) {
      return 'vegetables';
    } else if (aisleLower.includes('meat') || aisleLower.includes('seafood') || aisleLower.includes('protein')) {
      return 'proteins';
    } else if (aisleLower.includes('oil') || aisleLower.includes('fat')) {
      return 'fat';
    } else if (aisleLower.includes('sweet') || aisleLower.includes('sugar')) {
      return 'sweeteners';
    } else if (aisleLower.includes('spice') || aisleLower.includes('herb')) {
      return 'spices';
    } else {
      return 'other';
    }
  };
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      await searchIngredients(searchQuery);
    }
  };
  
  // Grouper les ingrédients par catégorie
  const groupedIngredients = categories.map(category => {
    const categoryIngredients = localIngredients.filter(ingredient => 
      ingredient.category === category.id
    );
    
    return {
      category,
      ingredients: categoryIngredients
    };
  }).filter(group => group.ingredients.length > 0 && (selectedCategory === null || selectedCategory === group.category.id));

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-amber-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-white hover:text-amber-200 mr-4">
              ← Accueil
            </Link>
            <h1 className="text-2xl font-bold">Mes ingrédients</h1>
          </div>
          
          {pantryItems.length > 0 && (
            <Link 
              href="/recipes/available" 
              className="bg-amber-700 hover:bg-amber-800 px-4 py-2 rounded-lg text-white transition"
            >
              Trouver des recettes
            </Link>
          )}
        </div>
      </header>
      
      <main className="flex-grow container mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Sélectionnez vos ingrédients</h2>
              <p className="text-gray-600 mb-6">
                Cherchez et choisissez les ingrédients dont vous disposez dans votre cuisine.
              </p>
              
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
              
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedCategory === null 
                      ? 'bg-amber-500 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  Tous
                </button>
                
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1 rounded-full text-sm flex items-center ${
                      selectedCategory === cat.id 
                        ? 'bg-amber-500 text-white' 
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    <span className="mr-1">{cat.icon}</span>
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
            
            {groupedIngredients.length === 0 && !loading && (
              <p className="text-gray-500 italic">
                Aucun ingrédient trouvé. Essayez une recherche différente.
              </p>
            )}
            
            {groupedIngredients.map(group => (
              <IngredientCategory 
                key={group.category.id}
                category={group.category}
                ingredients={group.ingredients}
              />
            ))}
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Ingrédients disponibles</h2>
            <PantryList />
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-100 p-4">
        <div className="container mx-auto text-center text-gray-500">
          © {new Date().getFullYear()} BakeItEasy - Tous droits réservés
        </div>
      </footer>
    </div>
  );
} 