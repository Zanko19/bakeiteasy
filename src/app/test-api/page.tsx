'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function TestApiPage() {
  const [apiKey, setApiKey] = useState<string>('');
  const [testResult, setTestResult] = useState<string>('En attente du test...');
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Vérifier la clé API
    const key = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
    setApiKey(key ? 'Définie' : 'Non définie');
  }, []);

  const testApi = async () => {
    setLoading(true);
    setTestResult('Test en cours...');
    
    try {
      // Test direct de l'API avec un terme simple en anglais
      const url = `https://api.spoonacular.com/food/ingredients/search?query=apple&number=5&metaInformation=true&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`;
      console.log('Test URL:', url.replace(process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY || '', '[API_KEY]'));
      
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erreur API:', errorText);
        setTestResult(`Échec du test: ${response.status} ${response.statusText}`);
        setIngredients([]);
      } else {
        const data = await response.json();
        console.log('Réponse API:', data);
        
        if (data.results && data.results.length > 0) {
          setTestResult(`Succès! ${data.results.length} ingrédients trouvés.`);
          setIngredients(data.results);
        } else {
          setTestResult('Aucun résultat trouvé, mais la connexion à l\'API fonctionne.');
          setIngredients([]);
        }
      }
    } catch (error) {
      console.error('Erreur lors du test:', error);
      setTestResult(`Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
      setIngredients([]);
    } finally {
      setLoading(false);
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
            <h1 className="text-2xl font-bold">Test de l&apos;API</h1>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto p-8">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Diagnostic de l&apos;API Spoonacular</h2>
          
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="font-semibold">État de la clé API: <span className={apiKey === 'Définie' ? 'text-green-600' : 'text-red-600'}>{apiKey}</span></p>
            <p className="text-sm text-gray-600 mt-2">
              Valeur: {process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY ? process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY.substring(0, 8) + '...' : 'Non définie'}
            </p>
          </div>
          
          <div className="mb-6">
            <button 
              onClick={testApi}
              disabled={loading}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-6 rounded-lg disabled:bg-gray-400"
            >
              {loading ? 'Test en cours...' : 'Tester la connexion API'}
            </button>
          </div>
          
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Résultat du test:</h3>
            <p className={`${testResult.includes('Succès') ? 'text-green-600' : 'text-amber-600'}`}>
              {testResult}
            </p>
          </div>
          
          {ingredients.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Ingrédients trouvés:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
              
              <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <h4 className="font-semibold mb-2">Test d&apos;image direct:</h4>
                <div className="flex items-center justify-center">
                  <div className="w-32 h-32 relative border">
                    <Image
                      src="https://spoonacular.com/cdn/ingredients_100x100/apple.jpg"
                      alt="Pomme (test)"
                      fill
                      className="object-contain"
                      sizes="128px"
                    />
                  </div>
                </div>
                <p className="text-center text-sm text-gray-600 mt-2">
                  Si cette image s&apos;affiche, les images fonctionnent correctement
                </p>
              </div>
            </div>
          )}
          
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold mb-2">Conseils de débogage:</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Assurez-vous d&apos;utiliser des termes de recherche en <strong>anglais</strong> ("flour" au lieu de "farine")</li>
              <li>Vérifiez que la clé API est correctement configurée dans le fichier .env</li>
              <li>Consultez la console du navigateur (F12) pour voir les erreurs potentielles</li>
              <li>Si les images ne s&apos;affichent pas, vérifiez si votre navigateur bloque les requêtes externes</li>
            </ul>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-100 p-4">
        <div className="container mx-auto text-center text-gray-500">
          © {new Date().getFullYear()} BakeItEasy - Diagnostic API
        </div>
      </footer>
    </div>
  );
} 