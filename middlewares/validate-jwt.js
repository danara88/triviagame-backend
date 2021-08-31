const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async ( req = request, res = response, next ) => {
    const token = req.header('x-token');
    if ( !token ) return res.status(401).json({ msg: 'There is not token in the request.' });
    try {
        const { uid } = jwt.verify(token, process.env.SECRETJWT);

        const user = await User.findById( uid );

        if ( !user ) return res.status(401).json({ msg: 'The token is not valid' });

        if ( !user.status ) return res.status(401).json({ msg: 'The token is not valid' });

        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ msg: 'The token is not valid' });
    }
}

module.exports = {
    validateJWT
}