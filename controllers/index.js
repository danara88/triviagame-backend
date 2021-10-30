const userController = require('./user');
const authController = require('./auth');
const categoryController = require('./category');
const gameController = require('./game');
const questionController = require('./question');
const answerController = require('./answer');
const rankingController = require('./ranking');

module.exports = {
    ...userController,
    ...authController,
    ...categoryController,
    ...gameController,
    ...questionController,
    ...answerController,
    ...rankingController,
}