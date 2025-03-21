import { recipes } from "@/data/recipes";
import RecipeCard from "@/components/RecipeCard";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-amber-600 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">BakeItEasy</h1>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto p-8">
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-center mb-10">
            Bienvenue sur BakeItEasy
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
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