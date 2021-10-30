const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateFields } = require('../middlewares');
const { getTopRankings } = require('../controllers');

const api = Router();

// Get the top rankings
api.get('/', [
    validateJWT,
    check('topNumber', 'Invalid query param').isNumeric(),
    validateFields,
], getTopRankings);

module.exports = api;