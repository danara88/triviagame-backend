const { Router } = require('express');
const { check } = require('express-validator');

const { createQuestion, 
        getQuestions, 
        getQuestion, 
        updateQuestion, 
        deleteQuestion, 
        getQuestionsByCategory} = require('../controllers');
        
const { validateFields, isAdminRole, validateJWT } = require('../middlewares');
const { existQuestionId, existCategoryId } = require('../helpers/db-validators');

const api = Router();

// Get all the questions
api.get('/', [
    validateJWT,
], getQuestions);

// Get question by id
api.get('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'The ID is invalid').isMongoId(),
    check('id').custom( existQuestionId ),
    validateFields
], getQuestion);

// Get questions by category
api.get('/questions-by-category/:categoryId', [
    validateJWT,
    check('categoryId', 'The ID is invalid').isMongoId(),
    check('categoryId').custom( existCategoryId ),
    validateFields
], getQuestionsByCategory);

// Creates a new question
api.post('/', [     
    validateJWT, 
    isAdminRole,
    check('sentence', 'The sentence is required').not().isEmpty(),
    check('category', 'The category ID is not valid').isMongoId(),
    check('category').custom(existCategoryId),
    validateFields
], createQuestion);

// Update an existing question
api.put('/:id', [
    validateJWT,
    isAdminRole,
    check('sentence', 'The sentence is required').not().isEmpty(),
    check('category', 'The category ID is not valid').isMongoId(),
    check('category').custom(existCategoryId),
    validateFields
], updateQuestion);

// Delete a question
api.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'The ID is invalid').isMongoId(),
    check('id').custom( existQuestionId ),
    validateFields
], deleteQuestion);


module.exports = api;