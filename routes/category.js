const { Router } = require('express');
const { check } = require('express-validator');

const { createCategory, 
        getCategories, 
        getCategory, 
        updateCategory, 
        deleteCategory } = require('../controllers');
        
const { validateFields, isAdminRole, validateJWT } = require('../middlewares');
const { existCategoryId } = require('../helpers/db-validators');

const api = Router();

// Get all the categories
api.get('/', [
    validateJWT
], getCategories);

// Get catergory by ID
api.get('/:id', [
    validateJWT,
    check('id', 'The ID is invalid').isMongoId(),
    check('id').custom( existCategoryId ),
    validateFields
], getCategory);

// Creates a new category
api.post('/', [     
    validateJWT, 
    isAdminRole,
    check('name', 'The name is required').not().isEmpty(),
    validateFields
], createCategory);

// Update an existing category
api.put('/:id', [
    validateJWT,
    isAdminRole,
    check('name', 'The name is required').not().isEmpty(),
    check('id', 'The ID is invalid').isMongoId(),
    check('id').custom( existCategoryId ),
    validateFields
], updateCategory);

// Delete a category
api.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'The ID is invalid').isMongoId(),
    check('id').custom( existCategoryId ),
    validateFields
], deleteCategory);


module.exports = api;