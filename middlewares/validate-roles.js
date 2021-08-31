/**
 * Validates if the user has admin permissions
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const isAdminRole = ( req, res, next ) => {
    if ( !req.user ) {
        return res.status(500).json({ msg: 'The token was not provided' });
    }
    
    const { role, name }  = req.user;

    if ( role !== 'ADMIN_ROLE' ) {
        return res.status(401).json({ msg: `${name} is not admin` });
    }
    
    next();
}

const haveRole = ( ...roles ) => {
    return ( req, res, next ) => {
        
        if ( !req.user ) {
            return res.status(500).json({ msg: 'Wanted to verify role user without verfying token' });
        }

        if ( !roles.includes(req.user.role) ) return res.status(401).json({ msg: `The route required to be exucted by these roles: ${ roles }`});

        next();
    }
}

module.exports = {
    isAdminRole,
    haveRole
}