'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRecipesContext } from '@/context/RecipesContext';
import { 
  searchRecipesByTitle, 
  searchRecipesByIngredient,
  filterRecipesByDifficulty,
  sortRecipesByTime
} from '@/utils/searchRecipes';
import RecipeCard from '@/components/RecipeCard';
import IngredientChip from '@/components/IngredientChip';

// Liste des ingrédients populaires
const popularIngredients = [
  'chocolat', 'beurre', 'œufs', 'farine', 'sucre', 
  'lait', 'vanille', 'pommes', 'cannelle', 'levure'
];

// Options de difficulté
const difficultyOptions = ['Toutes', 'Facile', 'Moyen', 'Difficile'];

export default function SearchPage() {
  const { recipes } = useRecipesContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Fonction pour basculer un ingrédient
  const toggleIngredient = (ingredient: string) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  // Filtrer les recettes en fonction des critères
  const filteredRecipes = useMemo(() => {
    let result = [...recipes];
    
    // Filtrer par titre
    if (searchTerm) {
      result = searchRecipesByTitle(result, searchTerm);
    }
    
    // Filtrer par ingrédients
    if (selectedIngredients.length > 0) {
      result = searchRecipesByIngredient(result, selectedIngredients);
    }
    
    // Filtrer par difficulté
    if (difficulty && difficulty !== 'Toutes') {
      result = filterRecipesByDifficulty(result, difficulty);
    }
    
    // Trier par temps
    result = sortRecipesByTime(result, sortOrder === 'asc');
    
    return result;
  }, [recipes, searchTerm, selectedIngredients, difficulty, sortOrder]);

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
        <h1 className="text-3xl font-bold mb-8 text-center">Recherche avancée</h1>
        
        {/* Barre de recherche */}
        <div className="mb-8 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Rechercher une recette..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        
        {/* Filtres */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Filtres</h2>
          
          {/* Ingrédients */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Ingrédients populaires</h3>
            <div className="flex flex-wrap">
              {popularIngredients.map(ingredient => (
                <IngredientChip
                  key={ingredient}
                  name={ingredient}
                  selected={selectedIngredients.includes(ingredient)}
                  onClick={() => toggleIngredient(ingredient)}
                />
              ))}
            </div>
          </div>
          
          {/* Difficulté */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Difficulté</h3>
            <div className="flex space-x-2">
              {difficultyOptions.map(option => (
                <button
                  key={option}
                  onClick={() => setDifficulty(option === 'Toutes' ? '' : option)}
                  className={`px-4 py-2 rounded-md ${
                    (option === 'Toutes' && !difficulty) || difficulty === option
                      ? 'bg-amber-500 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          
          {/* Tri par temps */}
          <div>
            <h3 className="text-lg font-medium mb-2">Tri par temps total</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setSortOrder('asc')}
                className={`px-4 py-2 rounded-md ${
                  sortOrder === 'asc'
                    ? 'bg-amber-500 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Le plus rapide
              </button>
              <button
                onClick={() => setSortOrder('desc')}
                className={`px-4 py-2 rounded-md ${
                  sortOrder === 'desc'
                    ? 'bg-amber-500 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Le plus long
              </button>
            </div>
          </div>
        </div>
        
        {/* Résultats */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {filteredRecipes.length} recette{filteredRecipes.length !== 1 ? 's' : ''} trouvée{filteredRecipes.length !== 1 ? 's' : ''}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500">
                Aucune recette ne correspond à vos critères de recherche.
              </div>
            )}
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