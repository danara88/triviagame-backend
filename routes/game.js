const { Router } = require('express');
const { check }  = require('express-validator');

const { createGame, endGame } = require('../controllers');
const { existCategoryId, existGameId } = require('../helpers');
const { validateFields, validateJWT } = require('../middlewares');

const api = Router();

api.post('/', [
    validateJWT,
    check('category', 'The category ID is not valid').isMongoId(),
    check('category').custom(existCategoryId),
    validateFields,
], createGame);

api.post('/end-game/:id', [
    validateJWT,
    check('id', 'The game ID is not valid').isMongoId(),
    check('id').custom(existGameId),
    check('totalScore', 'The total score is required').not().isEmpty(),
    validateFields,
], endGame);


module.exports = api;

