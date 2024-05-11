const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: Token missing or invalid format' });
    }
    const token = authHeader.slice(7); // Remove "Bearer " prefix from the token
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        console.error('Token verification error:', err); // Log the error for debugging
        return res.status(401).json({ message: 'Invalid token' });
      }
      console.log('Decoded token:', decoded); // Log the decoded token payload for debugging
      req.user = decoded;
      next();
    });
  };

module.exports = { verifyToken };
