const User = require('../models/user');
const Ranking = require('../models/ranking');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers');

const createUser = async (req, res) => {
    const { fullName, email, password } = req.body;
    const user = new User({fullName, email, password});

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();
    const token = await generateJWT(user._id);

    // Add the user to the ranking
    const ranking = new Ranking({ user: user._id });
    await ranking.save();

    res.json({
        user,
        token
    });
}

module.exports = {
    createUser
}