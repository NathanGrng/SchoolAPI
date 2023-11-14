# Journal de bord Nathan

## 05.09.2023

- Création du projet et familialisation avec l'environement de developpement npm.
- suivis du tutoriel de modzilla
- Suivis de la presentation sur node -> jusqu'au point 14

## 12.09.2023

- Reprise du suivis de la presentation sur node
- Conception de la base de donnée

## 19.09.2023

- installation de workbench
- Creation de la base de données
- Ecriture des requetes CRUD pour les differentes tables

## 25.09.2023

- Prise en conaissance des recommandation pour l'application mobile
- Création des requestes a la base de donnée depuis les fichiers API pour USER

## 03.10.2023

- Création d'un shema pour l'application mobile
- Passage en commentaire de toute les utilisations
- Ajout des requestes à la base de donnée pour les fichiers d'API pour récuperer les cours
- Tentative de réglé le probleme rencontrer:
  - Impossible de récuperer les information vennant d'une requete post
    - Solution utilisée : utilisation d'un bodyparser

## 10.10.2023

- Finission de la route user.js
- Début de la route course
- résolution de probleme avec le body

## 17.10.2023

- Amélioration des fonctions dans la route courses
- Début de la route category
- Fin de la route category

## 31.10.2023

- Ajout de commentaire pour facilité la comprehension du code

## 07.11.2023

- Ajout des requetes permettant d'ajouter une cathégorie a un cours ainsi que de la supprimer.
- Tentative d'ajout de transaction
- Documentation de l'API via postman

## 14.11.2023

Aujourd'hui, j'ai commencé par l'adaptation des deux requêtes d'ajout et de suppression de catégorie, car leurs noms n'étaient pas vraiment très *auto-explicatifs*, j'ai ensuite ajouté ,à ces dernières, une autre fonction qui met à jour le champ ``course_updateDate``. Au début j'avais essayé de mette à jour le tout avec un seul query, mais ça ne fonctionnait pas,alors j'ai choisi d'utiliser une autre fonction pour le faire. Après ça, j'ai documenté les modifications d'API que je venais de faire afin que la documentation soit à jours. Après ça, j'ai commencé à me pencher du côté de render afin de pouvoir héberger l'API sur le web. Pour pouvoir utiliser render, j'ai du crée un dépôt git avec le code contenant l'api, mais avant de copier le contenu du dépôt gitlab, j'ai d’abord fait un peu de nettoyage dans les différents fichiers.
