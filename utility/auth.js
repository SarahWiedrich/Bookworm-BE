require('dotenv').config();

const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const expiration = '2h';

module.exports = {
  authMiddleware: function(req, res, next) {
    // Get token
    let token = req.query.token || req.headers.authorization;
    if(req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if(!token) {
      return res.status(400).json({ message: 'No token detected' });
    }

    // Verify token and get user data
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      return res.status(400).json({ message: 'Invalid token' });
    }

    next();
  },
  signToken: function({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  }
};