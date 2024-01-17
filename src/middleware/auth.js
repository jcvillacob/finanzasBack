const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.status(403).send('Se requiere un token para la autenticación.');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send('Token inválido.');
    }
};

const verifyAdmin = (req, res, next) => {
    verifyUser(req, res, () => {
        if (req.user.role === 'admin') {
            next();
        } else {
            return res.status(403).send('Acceso denegado. Se requiere rol de administrador.');
        }
    });
};

module.exports = {
    verifyUser,
    verifyAdmin
};
