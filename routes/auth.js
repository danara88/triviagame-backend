const { Router } = require('express');
const { check }  = require('express-validator');

const { login } = require('../controllers');
const { validateFields } = require('../middlewares/validate-fields');

const api = Router();

api.post('/login', [
    check('email', 'The email is required').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    validateFields
],login);


module.exports = api;

