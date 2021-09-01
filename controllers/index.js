const userController = require('./user');
const authController = require('./auth');
const categoryController = require('./category');
const gameController = require('./game');
const questionController = require('./question');

module.exports = {
    ...userController,
    ...authController,
    ...categoryController,
    ...gameController,
    ...questionController,
}