const { Router } = require('express');
const { check }  = require('express-validator');

const { login, refreshToken } = require('../controllers');
const { validateJWT } = require('../middlewares');
const { validateFields } = require('../middlewares/validate-fields');

const api = Router();

api.post('/login', [
    check('email', 'The email is required').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    validateFields
],login);

api.post('/refresh', [
    validateJWT
], refreshToken);

module.exports = api;

