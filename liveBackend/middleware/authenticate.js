// middleware/authenticate.js
const jwt = require('jsonwebtoken');
const secretKey = 'kCu83ALWzcE04HAUTHepj';

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ error: 'Please authenticate.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ error: `Invalid token` });
  }
};

module.exports = authenticate;

