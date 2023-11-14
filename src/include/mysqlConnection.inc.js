/**
 * App         : APIClasse
 * Desctiption : This app is the projecte that we're making for the PWA course. It's the API part of the mobile application app 
 * Authors     : Nathan Grng, Sacha Kssln
 * Class       : T.IS-E2A
 * File        : mysqlConnection.inc.js.js
*/
const mysql = require('mysql');

// Configuration de la connexion à la base de données
const connection = mysql.createConnection({
host: '127.0.0.1', // Adresse du serveur MariaDB
user: 'schoolUser', // Nom d'utilisateur
password: 'XkhgqG7wihAtwV', // Mot de passe
database: 'school' // Nom de la base de données
});

// Établir la connexion à la base de données
connection.connect((err) => {
if (err) {
console.error('Erreur de connexion à la base de données : ' + err.stack);
return;
}
console.log('Connecté à la base de données MariaDB en tant que ID ' + connection.threadId);
});

module.exports = connection;

