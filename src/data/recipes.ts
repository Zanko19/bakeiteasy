import { Recipe } from '@/types/recipe';

export const recipes: Recipe[] = [
  {
    id: '1',
    title: 'Gâteau au chocolat',
    ingredients: [
      '200g de chocolat noir',
      '100g de beurre',
      '3 œufs',
      '150g de sucre',
      '50g de farine'
    ],
    instructions: [
      'Préchauffer le four à 180°C',
      'Faire fondre le chocolat avec le beurre',
      'Mélanger les œufs et le sucre',
      'Ajouter le mélange chocolat-beurre',
      'Incorporer la farine',
      'Cuire 25 minutes'
    ],
    preparationTime: 15,
    cookingTime: 25,
    difficulty: 'Facile',
    imageUrl: '/images/choc.jpg'
  },
  {
    id: '2',
    title: 'Tarte aux pommes',
    ingredients: [
      '1 pâte brisée',
      '6 pommes Golden',
      '100g de sucre',
      '50g de beurre',
      '1 sachet de sucre vanillé',
      '1 cuillère à café de cannelle'
    ],
    instructions: [
      'Préchauffer le four à 210°C',
      'Étaler la pâte dans un moule à tarte',
      'Éplucher et couper les pommes en fines tranches',
      'Disposer les pommes sur la pâte',
      'Mélanger le sucre, le sucre vanillé et la cannelle, puis saupoudrer sur les pommes',
      'Répartir des petits morceaux de beurre sur le dessus',
      "Cuire 30 minutes jusqu'à ce que la tarte soit dorée"
    ],
    preparationTime: 20,
    cookingTime: 30,
    difficulty: 'Facile',
    imageUrl: '/images/tarte-pommes.jpg'
  }
];
