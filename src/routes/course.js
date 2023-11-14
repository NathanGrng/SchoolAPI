/**
 * App         : APIClasse
 * Desctiption : This app is the projecte that we're making for the PWA course. It's the API part of the mobile application app 
 * Authors     : Nathan Grng, Sacha Kssln
 * Class       : T.IS-E2A
 * File        : course.js
*/

const express = require('express');
const router = express.Router();
// const courseChecker = require('../userChecker');
const db = require('../include/mysqlConnection.inc');

// used to get the current date
const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
const currentDate = `${year}-${month}-${day}`;// "2022-6-17"

//this is a "list" of http returned code
const httpCodes = {
    OK: 200,
    Created: 201,
    Deleted: 204,
    Error: 500
};

/**
 * Route : Get all the courses
 */
router.get("/", (req, res) => {
   
    getAllCourses(res);

});

/**
 * Route : Adding a new course to the database (Post)
 */
router.post("/", (req, res) => {
   
    addCourse(res, req.body.title, req.body.idUser);
    // }
    // else{
    //     console.log("The right is not correct");
    // }
});

/**
 * Route : Adding a note to a course or updating it on duplicate key
 */
router.post("/:idCourse", (req, res) => {
    addNoteToCourse(res, req.params.idCourse, req.body.idUser, req.body.note, req);
});

/**
 * This route is used to add a category to a course by it's id (put)
 */
router.put("/categoryAdd/:idCourse", (req, res) => {
    addCategoryToCourse(res, req.params.idCourse, req.body.idCategory);
});

/**
 * This route is used to remove a category from a course by it's id (put)
 */
router.put("/categoryRemove/:idCourse", (req, res) => {
    removeCategoryToCourse(res, req.params.idCourse, req.body.idCategory);
});

/**
 * Route : removing course from database (delete)
 */
router.delete("/:idCourse", (req, res) => {
    deleteCourse(res, req.params.idCourse);
});


// GET 

/**
 * 
 * @param {*} res 
 */
function getAllCourses(res) {
    db.query('SELECT `course_id`, `course_title`, `course_imgLink`, `course_appearanceDate`, `couse_updateDate`, `user_idTeacher` FROM `tbl_courses`', (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération des cours : ' + err.message);
            res.status(httpCodes.Error).send('Erreur serveur');
        } else {
            res.status(httpCodes.OK).json(result);
        }
    });
}

// POST

/**
 * Adding a course to the database
 * @param {*} res used to send a result to the user
 * @param {*} title title of the course that is going to be added
 * @param {*} creatorId id of the creator of the course
 */
function addCourse(res, title, creatorId) {
    db.beginTransaction();
    db.query('INSERT INTO `tbl_courses`(`course_title`, `course_appearanceDate`, `user_idTeacher`) VALUES (?,?,?)', [title, currentDate, creatorId], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'ajout du cours : ' + err.message);
            res.status(httpCodes.Error).send('Erreur serveur');
            db.rollback();
        } else {
            db.commit();
            res.status(httpCodes.Created).json(result);
        }
    });
}

/**
 * Adding a note 
 * @param {*} res //resultat
 * @param {*} idCourse //id du cours
 * @param {*} idUser // id de l'utilisateur
 * @param {*} note // note donnée au cours
 */
function addNoteToCourse(res, idCourse, idUser, note) {
    db.query('INSERT INTO `students_has_courses` (`course_id`, `student_id`, `student_give_note`) VALUES (?,?,?) ON DUPLICATE KEY UPDATE student_give_note = VALUES(student_give_note)', [idCourse, idUser, note], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'ajout d\'une note au cours : ' + err.message);
            res.status(httpCodes.Error).send('Erreur serveur');
        } else {
            res.status(httpCodes.Created).json(result);
        }
    });
}

// PUT

/**
 * Linking a category to a course
 * @param {*} res 
 * @param {*} idCourse 
 * @param {*} idCategory 
 * @returns 
 */
function addCategoryToCourse(res, idCourse, idCategory) {

    db.query('INSERT INTO `categories_has_courses`(`category_id`, `course_id`) VALUES (?,?) ON DUPLICATE KEY UPDATE `course_id` = `course_id`;', [idCategory, idCourse], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'ajout d\'une note au cours : ' + err.message);
            res.status(httpCodes.Error).send('Erreur serveur');
        } else {
            console.log(result);
            ChangeDateUpdate(res, idCourse, httpCodes.Created);
        }
    });

}

/**
 * Removing the link between a category and a course
 * @param {*} res 
 * @param {*} idCourse 
 * @param {*} idCategory 
 * @returns 
 */
function removeCategoryToCourse(res, idCourse, idCategory) {
    db.query('DELETE FROM `categories_has_courses` WHERE `category_id` = ? AND `course_id` = ?;', [idCategory, idCourse], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression de la catégorie du cours : ' + err.message);
            res.status(httpCodes.Error).send('Erreur serveur');
        } else {
            console.log(result);
            ChangeDateUpdate(res, idCourse, httpCodes.Deleted);
        }
    });
}

/**
 * Updating the date of the update of the course in the database  
 * @param {*} res 
 * @param {*} idCourse 
 * @param {*} code 
 */
function ChangeDateUpdate(res, idCourse, code) {
    db.query('UPDATE `tbl_courses` SET `course_updateDate`= CURRENT_TIMESTAMP() WHERE `tbl_courses`.`course_id` = ?', [idCourse], (err, result) => {
        if (err) {
            console.error('Erreur lors de la mise à jours de la date : ' + err.message);
            res.status(httpCodes.Error).send('Erreur serveur');
        } else {
            res.status(code).json(result);
        }
    });
}




// DELETE

/**
 * used to delete a course from the database
 * @param {*} res  
 * @param {*} courseId 
 */

function deleteCourse(res, courseId) {
    db.query('DELETE FROM `tbl_courses` WHERE `course_id` = ?', [courseId], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression du cours : ' + err.message);
            res.status(httpCodes.Error).send('Erreur serveur');
        } else {
            res.status(httpCodes.Deleted).json(result);
        }
    });
}

module.exports = router;



