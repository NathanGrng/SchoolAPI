/**
 * App         : APIClasse
 * Desctiption : This app is the projecte that we're making for the PWA course. It's the API part of the mobile application app 
 * Authors     : Nathan Grng, Sacha Kssln
 * Class       : T.IS-E2A
 * File        : userChecker.js
*/

/**
 * 
 * @param {User} userInfo 
 * @returns 
 */
function checkRight(userInfo){
    //Check user rights
    //User.username
    //User.password

    console.log("functionUnworking");

    return true;
}

/**
 * 
 * @param {express req} req 
 */
exports.checkRightReq = function (req) {
    let basicAuth = req.headers.authorization
    console.log(basicAuth);
    let userAuth = decodeBasicAuth(basicAuth);

    return checkRight(userAuth);
}

/**
 * 
 * @param {express res} res 
 */
exports.NoAccess = function (res) {
    res.status(401).send("User is not authentified");
}

/**
 * 
 * @param {*} param 
 * @returns User
 */
function decodeBasicAuth(param) {
    let encoded = param.split(' ')[1];
	// decode it using base64
    let decoded = atob(encoded);
    let partedUser = decoded.split(':');
    return new User(partedUser[0], partedUser[1]);
}


class User{
    constructor(username, password){
        this.username = username;
        this.password = password;
    }
}