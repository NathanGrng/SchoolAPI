/**
 * App         : APIClasse
 * Desctiption : This app is the projecte that we're making for the PWA course. It's the API part of the mobile application app 
 * Authors     : Nathan Grng, Sacha Kssln
 * Class       : T.IS-E2A
 * File        : category.js
*/

const express = require('express');
const router = express.Router();
// const categoryChecker = require('../categoryChecker');
const db = require('../include/mysqlConnection.inc');

const httpCodes = {
    OK: 200,
    Created: 201,
    Deleted: 204,
    Error: 500
};

/**
 * Route : Getting all categories (GET)
 */
router.get("/", (req, res) => {
    getAllCategory(res);
});

/**
 * Route : Getting a category by it's id (GET)
 */
router.get("/:idCategory", (req, res) => {
    getCategoryInfoById(res, req.params.idCategory);
})

/**
 * Route : Adding a category to the database (Post)
 */
router.post("/", (req, res) => {
    addCategory(res, req.body.categoryName, req.body.htmlContent);
});

/**
 * Route : deleting a category from database (delete)
 */
router.delete("/:idCategory", (req, res) => {
    deleteCategory(res, req.params.idCategory);
})

//Get

/**
 * 
 * @param {*} res 
 */
function getAllCategory(res) {
    db.query('SELECT `category_id`, `category_name`, `category_desc` FROM `tbl_categories`', (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération des cours : ' + err.message);
            res.status(httpCodes.Error).send('Erreur serveur');
        } else {
            res.status(httpCodes.OK).json(result);
        }
    });
}

/**
 * Récupere une categorie avec son id
 * @param {*} res 
 * @param {*} categoryId 
 */
function getCategoryInfoById(res, categoryId) {
    db.query('SELECT `category_id`, `category_name`, `category_desc` FROM `tbl_categories` WHERE `category_id` = ?', [categoryId], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'ajout du cours : ' + err.message);
            res.status(httpCodes.Error).send('Erreur serveur');
        } else {
            res.status(httpCodes.OK).json(result);
        }
    });
}

//POST

/**
 * Add a category
 * @param {*} req 
 * @param {*} categoryName 
 * @param {*} htmlContent 
 */
function addCategory(res, categoryName, htmlContent) {
    db.query('INSERT INTO `tbl_categories`(`category_name`, `category_desc`) VALUES (?,?)', [categoryName, htmlContent], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'ajout d\'une catégorie : ' + err.message);
            res.status(httpCodes.Error).send('Erreur serveur');
        } else {
            res.status(httpCodes.Created).json(result);
        }
    });
}



// Delete

/**
 * Supprime une categorie
 * @param {*} res 
 * @param {int} categoryId 
 */
function deleteCategory(res, categoryId) {
    db.query('DELETE FROM `tbl_categories` WHERE `category_id` = ?', [categoryId], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression de la categorie : ' + err.message);
            res.status(httpCodes.Error).send('Erreur serveur');
        } else {
            res.status(httpCodes.Deleted).json(result);
        }
    });
}



module.exports = router;



