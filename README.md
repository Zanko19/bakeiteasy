<p align="center">
  <img src="public/images/logo.png" alt="BakeItEasy Logo" width="200" height="200" style="margin-bottom: 20px"/>
</p>

<h1 align="center">BakeItEasy</h1>
<p align="center">Votre assistant de pâtisserie intelligent</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-0.1.0-blue.svg" alt="Version 0.1.0"/>
  <img src="https://img.shields.io/badge/Next.js-15.2.3-black.svg" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React-19.0.0-61DAFB.svg" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-5.8.2-blue.svg" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind-4.0.15-38B2AC.svg" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/licence-MIT-green.svg" alt="Licence MIT"/>
</p>

<br/>

## 🥐 Présentation

**BakeItEasy** est une application moderne dédiée à l'art de la pâtisserie, permettant aux passionnés de découvrir, partager et sauvegarder des recettes exceptionnelles. Notre objectif est de rendre la pâtisserie accessible à tous, des novices aux experts, grâce à une interface intuitive et des instructions détaillées.

## ✨ Fonctionnalités

- 🍰 **Catalogue de recettes** - Explorez une collection diversifiée de recettes de pâtisserie
- 🔍 **Recherche avancée** - Trouvez des recettes par ingrédients, temps de préparation ou niveau de difficulté
- 📱 **Design responsive** - Expérience utilisateur optimale sur tous les appareils
- 🌙 **Mode sombre/clair** - Interface adaptée à vos préférences visuelles
- 🔖 **Favoris** - Sauvegardez vos recettes préférées (à venir)
- 👤 **Profils personnalisés** - Créez votre collection de recettes (à venir)

## 🚀 Démarrage rapide

### Prérequis

- Node.js 20.9.0 ou supérieur
- npm 10.2.3 ou supérieur

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/votre-nom/bakeiteasy.git
cd bakeiteasy

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) pour voir l'application.

## 🧪 Tests

```bash
# Exécuter les tests unitaires
npm test

# Exécuter les tests avec suivi des modifications
npm run test:watch
```

## 🏗️ Structure du projet

```
bakeiteasy/
├── public/             # Assets statiques
│   └── images/         # Images des recettes et logos
├── src/
│   ├── app/            # Pages App Router de Next.js
│   ├── components/     # Composants React réutilisables
│   ├── context/        # Contextes React pour la gestion d'état
│   ├── data/           # Données mockées pour le développement
│   ├── hooks/          # Hooks React personnalisés
│   ├── services/       # Services et API calls
│   ├── types/          # Types et interfaces TypeScript
│   └── utils/          # Fonctions utilitaires
├── .eslintrc.json      # Configuration ESLint
├── next.config.ts      # Configuration Next.js
├── package.json        # Dépendances et scripts
├── postcss.config.mjs  # Configuration PostCSS
├── tailwind.config.js  # Configuration Tailwind CSS
└── tsconfig.json       # Configuration TypeScript
```

## 📦 Technologies utilisées

- **[Next.js](https://nextjs.org/)** - Framework React avec rendu côté serveur
- **[React](https://react.dev/)** - Bibliothèque JavaScript pour construire des interfaces utilisateur
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript avec typage statique
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utilitaire
- **[ESLint](https://eslint.org/)** - Linter JavaScript/TypeScript
- **[Prettier](https://prettier.io/)** - Formateur de code

## 🔜 Roadmap

- [ ] Système d'authentification
- [ ] Ajout et modification de recettes par les utilisateurs
- [ ] Système de notation et commentaires
- [ ] Calcul automatique des proportions
- [ ] Mode d'affichage pas à pas pendant la préparation
- [ ] Application mobile (PWA)

## 👥 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue pour signaler un bug ou proposer une nouvelle fonctionnalité.

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Committez vos changements (`git commit -m 'Add amazing feature'`)
4. Poussez vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus d'informations.

## 💖 Remerciements

- [Unsplash](https://unsplash.com/) pour les images libres de droits
- [Next.js Team](https://nextjs.org/) pour le framework incroyable
- Tous les contributeurs qui rendent ce projet possible

---

<p align="center">
  Créé avec ❤️ par [Votre Nom]
</p>
