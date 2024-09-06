# Financy - Personal Finances Dashboard

## Description
Financy est une application web qui permet aux utilisateurs de gérer leurs transactions financières personnelles. L'application inclut des fonctionnalités d'authentification, d'ajout, de modification, et de suppression de transactions. Elle propose également des visualisations graphiques des revenus et des dépenses.

## Fonctionnalités

- **Inscription et Connexion** : Les utilisateurs peuvent s'inscrire, se connecter et se déconnecter.
- **Gestion des transactions** : Ajouter, modifier et supprimer des transactions (revenus/dépenses).
- **Visualisation des transactions** : Liste complète des transactions avec des graphiques (donut et line chart) pour suivre l'évolution des finances.
- **Calcul des totaux** : Revenu total, dépense totale et balance globale affichés sous forme de cartes.
- **Interface intuitive** : Utilisation de Tailwind CSS et Daisy UI pour une interface utilisateur réactive et conviviale.

## Technologies utilisées

- **Frontend** : React.js, Tailwind CSS, Daisy UI, Chart.js
- **Backend** : Laravel (API pour gérer les transactions)
- **Authentification** : Laravel Sanctum pour l'authentification via tokens.
- **Routing** : React Router

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Node.js](https://nodejs.org/en/) (Version 14 ou supérieure)
- [NPM](https://www.npmjs.com/get-npm) ou [Yarn](https://yarnpkg.com/)
- [PHP](https://www.php.net/) (Version 7.4 ou supérieure) et [Composer](https://getcomposer.org/)
- [Laravel](https://laravel.com/)

## Installation

### Backend (Laravel)

1. Clonez le projet backend (si ce n'est pas déjà fait) :
   ```bash
   git clone https://github.com/votre-repo/laravel-backend.git
   cd laravel-backend
