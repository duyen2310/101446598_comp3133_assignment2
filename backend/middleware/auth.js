const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = ({ req }) => {
    const token = req.headers.authorization || '';
    if (token) {
        try {
            const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
            return { user: decoded };
        } catch (err) {
            console.error('Invalid token');
        }
    }
    return {};
};

module.exports = authMiddleware;
