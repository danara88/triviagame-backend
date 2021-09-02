const User = require('../models/user');
const Category = require('../models/category');
const Game = require('../models/game');
const Question = require('../models/question');
const Answer = require('../models/answer');



/**
 * Validate if the user email is not registered yet
 */
const existsEmailUser = async (email) => {
    const user = await User.findOne({ email });
    if (user) throw new Error(`The email ${ email } is already registered`);
}

/*
* Validates if the category exists in the database
*/
const existCategoryId = async ( id = '' ) => {
    const category = await Category.findById(id);
    if ( !category ) {
      throw new Error(`The id ${ id } does´t exists`);
    }
}

/*
* Validates if the question exists in the database
*/
const existQuestionId = async ( id = '' ) => {
  const question = await Question.findById(id);
  if ( !question ) {
    throw new Error(`The id ${ id } does´t exists`);
  }
}

/*
* Validates if the answer exists in the database
*/
const existAnswerId = async ( id = '' ) => {
  const answer = await Answer.findById(id);
  if ( !answer ) {
    throw new Error(`The id ${ id } does´t exists`);
  }
}

/**
 * Validates if the game exists in DB
 * @param {*} id 
 */
const existGameId = async ( id = '' ) => {
  const game = await Game.findById(id);
  if ( !game ) {
    throw new Error(`The id ${ id } does´t exists`);
  }
}

module.exports = {
    existsEmailUser,
    existCategoryId,
    existAnswerId,
    existGameId,
    existQuestionId,
}