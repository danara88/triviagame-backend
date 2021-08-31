const userController = require('./user');
const authController = require('./auth');
const categoryController = require('./category');

module.exports = {
    ...userController,
    ...authController,
    ...categoryController,
}