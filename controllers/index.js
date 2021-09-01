const userController = require('./user');
const authController = require('./auth');
const categoryController = require('./category');
const gameController = require('./game');

module.exports = {
    ...userController,
    ...authController,
    ...categoryController,
    ...gameController,
}