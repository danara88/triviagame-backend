const dbValidators = require('./db-validators');
const generateJWT = require('./generate-jwt');
const passwordValidator = require('./password-validator');

module.exports = {
    ...dbValidators,
    ...generateJWT,
    ...passwordValidator,
}