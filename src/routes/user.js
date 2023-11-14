/**
 * App         : APIClasse
 * Desctiption : This app is the projecte that we're making for the PWA course. It's the API part of the mobile application app 
 * Authors     : Nathan Grng, Sacha Kssln
 * Class       : T.IS-E2A
 * File        : user.js
*/

const express = require('express');
const router = express.Router();
//const userChecker = require('../include/userChecker');
const db = require('../include/mysqlConnection.inc');

const httpCodes = {
    OK: 200,
    Created: 201,
    Deleted: 204,
    Error: 500
};

/**
 * GET : all users
 */
router.get("/", (req, res) => {
    getAllUsers(res);
});

/**
 * GET : user by id
 */
router.get("/:idUser", (req, res) => {
    getUserInfoById(res, req.params.idUser);
})

/**
 * POST : Create user 
 */
router.post("/", (req, res) => {
    addUser(res, req.body.Username, req.body.Password, req.body.IsUserTeacher);
});

/**
 * DELETE : User by id
 */
router.delete("/:idUser", (req, res) => {
    deleteUser(res, req.params.idUser);
})

/**
 * function used to get all users
 * @param {*} res 
 */
function getAllUsers(res) {
    db.query('SELECT `user_id`, `user_name`,`user_is_teacher` FROM `tbl_user`;', (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération des utilisateurs : ' + err.message);
            res.status(httpCodes.Error).send('Erreur serveur');
        } else {
            res.status(httpCodes.OK).json(result);
        }
    });
}

/**
 * function used to get a user with it's id
 * 
 * @param {*} res 
 * @param {*} userId 
 */
function getUserInfoById(res, userId) {
    db.query('SELECT `user_id`, `user_name`, `user_is_teacher` FROM `tbl_user` WHERE `user_id` = ?', [userId], (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération des utilisateurs : ' + err.message);
            res.status(httpCodes.Error).send('Erreur serveur');
        } else {
            res.status(httpCodes.OK).json(result);
        }
    });
} 

/**
 * function used to add an user 
 * @param {*} res 
 * @param {*} userName 
 * @param {*} userPWD 
 * @param {*} userIsTeacher 
 */
function addUser(res, userName, userPWD, userIsTeacher) {
    var sha256 = require('js-sha256').sha256;
    var salt = userPWD + "d9Cf6DeQt3bSVH";
    var newPWD = sha256(salt);
    db.query('INSERT INTO `tbl_user`( `user_name`, `user_pwd`, `user_is_teacher`) VALUES (?,?,?) ;', [userName, newPWD, userIsTeacher], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion de l\'utilisateurs : ' + err.message);
            res.status(httpCodes.Error).send('Erreur serveur');
        } else {
            res.status(httpCodes.Created).json(result);
        }
    });
}

/**
 * function used to delete an user
 * @param {*} res 
 * @param {*} userId 
 */
function deleteUser(res, userId) {
    db.query('DELETE FROM `tbl_user` WHERE `user_id` = ? ;', [userId], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression de l\'utilisateurs : ' + err.message);
            res.status(httpCodes.Error).send('Erreur serveur');
        } else {
            res.status(httpCodes.Deleted).json(result);
        }
    });
}

module.exports = router;



