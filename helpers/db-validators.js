const User = require('../models/user');
const Category = require('../models/category');

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

module.exports = {
    existsEmailUser,
    existCategoryId,
}