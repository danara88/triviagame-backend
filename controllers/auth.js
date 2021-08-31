const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');


const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        // Verify if the email exists
        const user = await User.findOne({ email });    
        if (!user) return res.status(400).json({ msg: 'User or password is incorrect' });

        // If the user is active in the DB
        if ( !user.status ) return res.status(400).json({ msg: 'User or password is incorrect' });

        // verificar la contraseña
        const verifyPassword = bcryptjs.compareSync(password, user.password);
        if ( !verifyPassword ) return res.status(400).json({ msg: 'User or password is incorrect' });

        // Generar el token
        const token = await generateJWT( user._id );

        res.status(200).json({
            user,
            token
        });

    } catch (error) {
        console.log(error);
        return res.send(500).json({ msg: 'Something went wrong' });
    }

}
   

module.exports = {
    login,
} 