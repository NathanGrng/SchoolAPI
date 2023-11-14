/**
 * App         : APIClasse
 * Desctiption : This app is the projecte that we're making for the PWA course. It's the API part of the mobile application app 
 * Authors     : Nathan Grng, Sacha Kssln
 * Class       : T.IS-E2A
 * File        : app.js
*/

const express = require('express');

const app = express();

const PORT = 8080;

app.use(express.json());

// Utilisation d'un body parser pour analyser le corps des requets post
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Creation des constantes utiliser par 'app' pour géré les infromation
const userRoute = require('./routes/user');
const courseRoute = require('./routes/course');
const categoryRoute = require('./routes/category')

// Utilisation des routeurs
app.use("/user", userRoute);
app.use("/course", courseRoute);
app.use("/category", categoryRoute);

//Lancement de l'app
app.listen(PORT, () => {
    console.log("Server is running");
});