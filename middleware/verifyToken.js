import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token missing' });

  const token = authHeader.split(' ')[1]; // Format: "Bearer <token>"
  if (!token) return res.status(401).json({ error: 'Token malformed' });

  jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.userId = decoded.userId;
    req.username = decoded.username; // Optional if you need it later
    next();
  });
};

export default verifyToken;


