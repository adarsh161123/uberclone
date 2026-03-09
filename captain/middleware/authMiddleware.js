const jwt = require('jsonwebtoken');
const Captain = require('../models/captain.model');

const authMiddleware = async (req, res, next) => {  
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await Captain.findById(decoded.userId);
        if (!captain) {    
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.captain = captain;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = authMiddleware;