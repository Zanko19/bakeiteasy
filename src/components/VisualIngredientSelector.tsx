'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { categories } from '@/data/ingredients';
import { commonIngredients } from '@/data/commonIngredients';
import { usePantry } from '@/context/PantryContext';
import { Ingredient } from '@/types/ingredient';

export default function VisualIngredientSelector() {
  const { addToPantry } = usePantry();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [spoonacularImageUrls, setSpoonacularImageUrls] = useState<Record<string, string>>({});
  const [imageFallback, setImageFallback] = useState<Record<string, boolean>>({});
  
  // Charger les images Spoonacular pour les ingrédients communs
  useEffect(() => {
    const fetchImages = async () => {
      const imageUrls: Record<string, string> = {};
      
      // Pour chaque ingrédient commun, on va chercher son image sur Spoonacular
      for (const ingredient of commonIngredients) {
        imageUrls[ingredient.englishName] = `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.imageUrl}`;
      }
      
      setSpoonacularImageUrls(imageUrls);
    };
    
    fetchImages();
  }, []);
  
  // Filtrer les ingrédients par catégorie sélectionnée
  const filteredIngredients = selectedCategory
    ? commonIngredients.filter(ingredient => ingredient.category === selectedCategory)
    : commonIngredients;
  
  // Gérer les erreurs d'image
  const handleImageError = (ingredientName: string) => {
    setImageFallback(prev => ({
      ...prev,
      [ingredientName]: true
    }));
  };
  
  // Ajouter un ingrédient au panier
  const handleIngredientClick = (ingredient: typeof commonIngredients[0]) => {
    const pantryIngredient: Ingredient = {
      id: `common_${ingredient.englishName.replace(/\s+/g, '_')}`,
      name: ingredient.name,
      category: ingredient.category,
      imageUrl: imageFallback[ingredient.englishName]
        ? `/images/placeholder-food.png`
        : spoonacularImageUrls[ingredient.englishName] || `/images/placeholder-food.png`,
      unit: 'unité'
    };
    
    // Appeler addToPantry avec l'ID au lieu de l'objet entier
    addToPantry(pantryIngredient.id, 1);
  };
  
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-4">Ingrédients courants</h2>
      <p className="text-gray-600 mb-6">
        Cliquez sur un ingrédient pour l&apos;ajouter à votre panier
      </p>
      
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
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredIngredients.map((ingredient) => (
          <div 
            key={ingredient.englishName}
            className="border rounded-lg p-4 flex flex-col items-center cursor-pointer hover:bg-amber-50 hover:border-amber-300 transition-colors"
            onClick={() => handleIngredientClick(ingredient)}
          >
            <div className="w-24 h-24 mb-3 relative">
              <Image
                src={imageFallback[ingredient.englishName]
                  ? `/images/placeholder-food.png`
                  : spoonacularImageUrls[ingredient.englishName] || `/images/placeholder-food.png`
                }
                alt={ingredient.name}
                width={96}
                height={96}
                className="object-contain"
                onError={() => handleImageError(ingredient.englishName)}
              />
            </div>
            <p className="text-center font-medium">{ingredient.name}</p>
            <p className="text-xs text-blue-500 mt-1 bg-blue-50 px-2 py-0.5 rounded-full">
              Ajouter +
            </p>
          </div>
        ))}
      </div>
    </div>
  );
} 