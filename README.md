# APIClasse

## Membre travaillant sur le projet

- Nathan Grng
- Sacha Kssln

## Description du projet

### Objectifs

Réaliser une application mobile javascript :

- Utilisation d’une API pour récupérer des données

- Utilisation d’une API pour conserver les données
- Design responsive
  - adapté au mobile
  
- Interactivité avec Typescript/Javascript
  - Evènement sur des boutons
  - Formulaire de contact
  - Promise

- Données en local
  - localStorage
  - IndexedDB
- PWA (après)

### Fonctionnement de l’App

- Page Login : nom utilisateur / mot de passe
  - Page Accueil
  - La photo + titre du dernier cours disponible
  - L’utilisateur peut s’inscrire ou mettre « en voir plus tard » (un menu pour cette liste sera présent)
- Page « Liste cours »
  - Avec le titre du cours, la photo
  - La note du cours
  - Système de classement par catégorie
  - Inscription au cours
- Liste des cours « inscrits »
  - Voir la liste des cours
  - Tri par mise à jour
  - Click pour aller sur le cours
- Page du cours
  - Liste des sections avec titre
  - Contenu du cours ensuite

(optionnel) :

- Page créer un cours
  - Un formulaire avec les données du cours
  - Un formulaire pour créer des contenus dedans

L’application sera adaptée pour être en mode PWA. Les données seront conservées d’abord en local (indexedDB) puis par la suite elles seront envoyées sur une API REST (votre API en local faite avec nodejs ou autre solution)
Remarque WebStorage incompatible avec les PWA

Pour les données :
API pour une image : pexels <https://api.pexels.com/v1/search?query=nature&per_page=1>

## Documentation

La documentation de la partie API du projet est disponible a cette URL : <https://documenter.getpostman.com/view/19385201/2s9YXh42WC>
