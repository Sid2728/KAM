const jwt = require('jsonwebtoken');
const authMiddleware = {
    authenticate : (req, res, next) => {
        const token = req.header('Authorization')?.split(' ')[1]; // Expect 'Bearer <token>'
        if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          req.user = decoded;
          next();
        } catch (err) {
          res.status(400).json({ message: 'Invalid token.' });
        }
      },
      authorize: (roles) => (req, res, next) => {
        if (!roles.includes(req.user.role)) {
          return res.status(403).json({ message: 'Forbidden: You do not have access to this resource.' });
        }
        next();
      }   
}

module.exports = authMiddleware;