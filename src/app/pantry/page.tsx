'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { categories } from '@/data/ingredients';
import PantryList from '@/components/PantryList';
import { usePantry } from '@/context/PantryContext';
import { useTranslatedIngredientsSearch } from '@/hooks/useTranslatedSearch';
import { SpoonacularIngredient } from '@/services/spoonacularApi';
import { Ingredient } from '@/types/ingredient';
import VisualIngredientSelector from '@/components/VisualIngredientSelector';
import Image from 'next/image';

export default function PantryPage() {
  const { pantryItems, addToPantry } = usePantry();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { 
    ingredients: spoonacularIngredients, 
    loading, 
    error, 
    searchIngredients,
    originalQuery,
    translatedQuery 
  } = useTranslatedIngredientsSearch();
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
      name: ingredient.name, // Déjà traduit par notre hook
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
    
    if (aisleLower.includes('laitier') || aisleLower.includes('lait') || aisleLower.includes('fromage')) {
      return 'dairy';
    } else if (aisleLower.includes('boulangerie') || aisleLower.includes('farine') || aisleLower.includes('céréales')) {
      return 'cereals';
    } else if (aisleLower.includes('produits') && aisleLower.includes('fruit')) {
      return 'fruits';
    } else if (aisleLower.includes('produits') || aisleLower.includes('légumes')) {
      return 'vegetables';
    } else if (aisleLower.includes('viande') || aisleLower.includes('poisson') || aisleLower.includes('fruits de mer') || aisleLower.includes('protéine')) {
      return 'proteins';
    } else if (aisleLower.includes('huile') || aisleLower.includes('graisse')) {
      return 'fat';
    } else if (aisleLower.includes('sucré') || aisleLower.includes('sucre')) {
      return 'sweeteners';
    } else if (aisleLower.includes('épice') || aisleLower.includes('herbe')) {
      return 'spices';
    } else {
      return 'other';
    }
  };
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchResults(true);
      await searchIngredients(searchQuery);
    }
  };
  
  // Fonction pour ajouter un ingrédient au panier
  const handleAddIngredient = (ingredientId: string) => {
    addToPantry(ingredientId, 1);
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

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (!value.trim()) {
      setShowSearchResults(false);
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
                Choisissez les ingrédients dont vous disposez dans votre cuisine.
              </p>
              
              {/* Sélecteur visuel d'ingrédients */}
              <VisualIngredientSelector />
              
              <div className="my-8 border-t border-gray-200 pt-8">
                <h3 className="text-xl font-bold mb-4">Recherche avancée</h3>
                <form onSubmit={handleSearch} className="mb-8">
                  <div className="flex max-w-2xl">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchInputChange}
                      placeholder="Rechercher un ingrédient..."
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
              </div>
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                  {error}
                </div>
              )}
              
              {showSearchResults && translatedQuery && originalQuery && (
                <div className="bg-blue-50 border border-blue-200 text-blue-600 px-4 py-3 rounded mb-6">
                  <p className="text-sm">
                    <span className="font-medium">Terme recherché :</span> &quot;{originalQuery}&quot;
                    <br />
                    <span className="font-medium">Traduit en anglais :</span> &quot;{translatedQuery}&quot;
                  </p>
                </div>
              )}
              
              {showSearchResults && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Résultats de recherche</h3>
                    <button
                      onClick={() => setShowSearchResults(false)}
                      className="text-gray-500 hover:text-gray-700 text-sm"
                    >
                      Masquer les résultats
                    </button>
                  </div>
                  
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
                  
                  {groupedIngredients.length === 0 && !loading && (
                    <p className="text-gray-500 italic">
                      Aucun ingrédient trouvé. Essayez une recherche différente.
                    </p>
                  )}
                  
                  <div className="space-y-6">
                    {groupedIngredients.map(group => (
                      <div key={group.category.id}>
                        <h4 className="font-semibold flex items-center mb-2">
                          <span className="mr-2">{group.category.icon}</span>
                          {group.category.name}
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {group.ingredients.map(ingredient => (
                            <div 
                              key={ingredient.id}
                              className="border rounded-lg p-3 flex flex-col items-center cursor-pointer hover:bg-amber-50 hover:border-amber-300 transition-colors"
                              onClick={() => handleAddIngredient(ingredient.id)}
                            >
                              <div className="w-16 h-16 mb-2 relative">
                                <Image
                                  src={ingredient.imageUrl || '/placeholder-ingredient.png'}
                                  alt={ingredient.name}
                                  fill
                                  className="object-contain"
                                  sizes="64px"
                                />
                              </div>
                              <p className="text-center text-sm font-medium">{ingredient.name}</p>
                              <p className="text-xs text-blue-500 mt-1 bg-blue-50 px-2 py-0.5 rounded-full">
                                Ajouter +
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
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