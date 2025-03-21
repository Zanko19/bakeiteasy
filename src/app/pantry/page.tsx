'use client';

import React from 'react';
import Link from 'next/link';
import { categories, ingredients } from '@/data/ingredients';
import IngredientCategory from '@/components/IngredientCategory';
import PantryList from '@/components/PantryList';
import { usePantry } from '@/context/PantryContext';

export default function PantryPage() {
  const { pantryItems } = usePantry();
  
  // Grouper les ingrédients par catégorie
  const groupedIngredients = categories.map(category => {
    const categoryIngredients = ingredients.filter(ingredient => 
      ingredient.category === category.id
    );
    
    return {
      category,
      ingredients: categoryIngredients
    };
  }).filter(group => group.ingredients.length > 0);

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
                Choisissez les ingrédients dont vous disposez dans votre cuisine pour 
                trouver des recettes adaptées.
              </p>
            </div>
            
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