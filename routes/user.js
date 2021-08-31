const { Router } = require('express');
const { check } = require('express-validator');
const api = Router();

const { createUser } = require('../controllers');
const { validateFields } = require('../middlewares');
const { existsEmailUser, passwordValidator } = require('../helpers');

api.post('/', [
    check('fullName', 'Your full name is required').not().isEmpty(),
    check('email', 'The email is required').not().isEmpty(),
    check('email', 'The email is not valid').isEmail(),
    validateFields,
    check('email').custom(existsEmailUser),
    check('password', 'The password is required').not().isEmpty(),
    validateFields,
    check('password').custom(passwordValidator),
    validateFields
], createUser);


module.exports = api;