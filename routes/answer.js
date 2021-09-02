const { Router } = require('express');
const { check  } = require('express-validator');
const api = Router();

const { createAnswer, getAnswersByQuestion, updateAnswer, deleteAnswer } = require('../controllers');
const { existQuestionId, existAnswerId } = require('../helpers');
const { validateJWT, validateFields, isAdminRole } = require('../middlewares');

// Create answer
api.post('/', [
    validateJWT,
    isAdminRole,
    check('content', 'The content is required').not().isEmpty(),
    check('question').custom(existQuestionId),
    validateFields
], createAnswer);

// Get answers by question
api.get('/answers-by-question/:questionId', [
    validateJWT,
    check('questionId', 'The question ID is not valid').isMongoId(),
    check('questionId').custom(existQuestionId),
    validateFields
], getAnswersByQuestion);

// Update answer
api.put('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'The answer ID is not valid').isMongoId(),
    check('id').custom(existAnswerId),
    check('content', 'The content is required').not().isEmpty(),
    check('question').custom(existQuestionId),
    validateFields
], updateAnswer);

// Delete answer
api.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'The answer ID is not valid').isMongoId(),
    check('id').custom(existAnswerId),
    validateFields
], deleteAnswer);

module.exports = api;